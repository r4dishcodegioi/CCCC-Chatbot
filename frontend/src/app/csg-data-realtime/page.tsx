'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { getParticipants } from '@/lib/api';
import { ParticipantRecord } from '@/lib/types';
import {
  FiRefreshCw,
  FiDownload,
  FiSearch,
  FiFilter,
  FiEye,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiStar,
  FiFileText,
  FiPlay,
  FiPause,
  FiX,
  FiAward,
  FiCalendar,
} from 'react-icons/fi';


export default function CsgDataRealtimePage() {
  const [participants, setParticipants] = useState<ParticipantRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-refresh state
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(5);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'COMPLETED' | 'PENDING'>('ALL');
  const [scentFilter, setScentFilter] = useState<string>('ALL');

  // Selected participant for modal
  const [selectedParticipant, setSelectedParticipant] = useState<ParticipantRecord | null>(null);

  // Date filter (Default: from July 1, 2026 onwards as requested)
  const [startDateFilter, setStartDateFilter] = useState<string>('2026-07-01');

  // Track previous participant count for new registration alert effect
  const prevCountRef = useRef<number>(0);
  const [newCountAlert, setNewCountAlert] = useState<number>(0);

  const fetchRealtimeData = async (isSilent = false) => {
    if (!isSilent) setRefreshing(true);
    try {
      const data: ParticipantRecord[] = await getParticipants();
      
      // Check if new participants arrived
      if (prevCountRef.current > 0 && data.length > prevCountRef.current) {
        const added = data.length - prevCountRef.current;
        setNewCountAlert(added);
        setTimeout(() => setNewCountAlert(0), 4000);
      }
      prevCountRef.current = data.length;

      setParticipants(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err: any) {
      console.error('Error fetching realtime participants:', err);
      if (!participants.length) {
        setError(err.message || 'Không thể tải dữ liệu từ máy chủ.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchRealtimeData();
  }, []);

  // Auto refresh timer (every 5 seconds)
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchRealtimeData(true);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Reset countdown when toggled
  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
    setCountdown(5);
  };

  // Filter participants by start date (default July 1, 2026)
  const activeParticipants = useMemo(() => {
    if (!startDateFilter) return participants;
    // VN Time (+07:00) midnight for YYYY-MM-DD
    const startTimestamp = new Date(`${startDateFilter}T00:00:00+07:00`).getTime();
    return participants.filter((p) => {
      if (!p.createdAt) return true;
      return new Date(p.createdAt).getTime() >= startTimestamp;
    });
  }, [participants, startDateFilter]);

  // KPI calculations
  const stats = useMemo(() => {
    const total = activeParticipants.length;
    const completed = activeParticipants.filter((p) => p.results && p.results.length > 0).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Scent distribution
    const scentCounts: Record<string, number> = {};
    activeParticipants.forEach((p) => {
      const latestResult = p.results && p.results.length > 0 ? p.results[0] : null;
      if (latestResult?.scentIdentity) {
        scentCounts[latestResult.scentIdentity] = (scentCounts[latestResult.scentIdentity] || 0) + 1;
      }
    });

    let topScent = 'Chưa có';
    let maxScentCount = 0;
    Object.entries(scentCounts).forEach(([scent, count]) => {
      if (count > maxScentCount) {
        maxScentCount = count;
        topScent = scent;
      }
    });

    return {
      total,
      completed,
      pending,
      completionRate,
      topScent,
      scentCounts,
    };
  }, [activeParticipants]);

  // Unique Scent Identities for dropdown
  const availableScents = useMemo(() => {
    const scents = new Set<string>();
    activeParticipants.forEach((p) => {
      const latestResult = p.results && p.results.length > 0 ? p.results[0] : null;
      if (latestResult?.scentIdentity) {
        scents.add(latestResult.scentIdentity);
      }
    });
    return Array.from(scents);
  }, [activeParticipants]);

  // Filtered participants list
  const filteredParticipants = useMemo(() => {
    return activeParticipants.filter((p) => {
      const latestResult = p.results && p.results.length > 0 ? p.results[0] : null;
      const isCompleted = !!latestResult;

      // Status filter
      if (statusFilter === 'COMPLETED' && !isCompleted) return false;
      if (statusFilter === 'PENDING' && isCompleted) return false;

      // Scent filter
      if (scentFilter !== 'ALL' && latestResult?.scentIdentity !== scentFilter) {
        return false;
      }

      // Search term
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase().trim();
        const matchName = p.fullName.toLowerCase().includes(query);
        const matchId = p.studentId.toLowerCase().includes(query);
        const matchEmail = p.email.toLowerCase().includes(query);
        const matchScent = latestResult?.scentIdentity?.toLowerCase().includes(query) || false;
        if (!matchName && !matchId && !matchEmail && !matchScent) return false;
      }

      return true;
    });
  }, [activeParticipants, statusFilter, scentFilter, searchTerm]);

  // Export to CSV with UTF-8 BOM
  const handleExportCSV = () => {
    if (activeParticipants.length === 0) return;

    const headers = [
      'STT',
      'Họ và Tên',
      'MSSV',
      'Email',
      'Trạng Thái',
      'Dấu Ấn Mùi Hương',
      'Công Thức Tinh Dầu',
      'Mô Tả Tính Cách',
      'Mô Tả Mùi Hương',
      'Thời Gian Đăng Ký',
      'Thời Gian Hoàn Thành Test',
    ];

    const rows = activeParticipants.map((p, index) => {
      const latestResult = p.results && p.results.length > 0 ? p.results[0] : null;
      const status = latestResult ? 'Đã hoàn thành test' : 'Chưa làm test';
      const scentIdentity = latestResult?.scentIdentity || '';
      
      const formulaStr = latestResult?.formula
        ? latestResult.formula.map((item) => `${item.name}: ${item.drops} giọt`).join('; ')
        : '';

      const personality = latestResult?.personalityDescription || '';
      const scentDesc = latestResult?.scentDescription || '';
      const regTime = p.createdAt ? new Date(p.createdAt).toLocaleString('vi-VN') : '';
      const testTime = latestResult?.createdAt ? new Date(latestResult.createdAt).toLocaleString('vi-VN') : '';

      // Escape quotes for CSV
      const escapeCsv = (str: string) => `"${str.replace(/"/g, '""')}"`;

      return [
        index + 1,
        escapeCsv(p.fullName),
        escapeCsv(p.studentId),
        escapeCsv(p.email),
        escapeCsv(status),
        escapeCsv(scentIdentity),
        escapeCsv(formulaStr),
        escapeCsv(personality),
        escapeCsv(scentDesc),
        escapeCsv(regTime),
        escapeCsv(testTime),
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
    link.setAttribute('download', `CSG_Participants_Realtime_${timestamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to check if record is very recent (< 2 minutes)
  const isRecentRecord = (dateStr?: string) => {
    if (!dateStr) return false;
    const diff = Date.now() - new Date(dateStr).getTime();
    return diff < 2 * 60 * 1000;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-[#F5EFE6] to-blush/30 py-8 px-4 sm:px-6 lg:px-8 font-body text-tea-brown">
      {/* New count floating alert */}
      {newCountAlert > 0 && (
        <div className="fixed top-6 right-6 z-50 animate-bounce bg-deep-green text-white px-5 py-3 rounded-full shadow-2xl border-2 border-gold flex items-center gap-2">
          <FiStar className="text-gold animate-spin" />
          <span className="font-semibold text-sm">
            🎉 Có {newCountAlert} người tham gia mới vừa đăng ký!
          </span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-deep-green via-[#3D4F3D] to-tea-brown text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-sage/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gold/20 text-light-yellow border border-gold/40 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-ping" />
                LIVE STREAMING
              </span>
              <span className="text-xs text-sage">
                {lastUpdated ? `Cập nhật lúc: ${lastUpdated.toLocaleTimeString('vi-VN')}` : 'Đang tải...'}
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-cream">
              CSG Realtime Data Hub
            </h1>
            <p className="text-sm sm:text-base text-blush/90 max-w-2xl">
              Hệ thống theo dõi & xuất kết quả khảo sát tính cách qua dấu ấn mùi hương realtime.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Auto refresh button */}
            <button
              onClick={toggleAutoRefresh}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-sm ${
                autoRefresh
                  ? 'bg-emerald-600/90 text-white border border-emerald-400/50 hover:bg-emerald-500'
                  : 'bg-white/10 text-cream border border-white/20 hover:bg-white/20'
              }`}
            >
              {autoRefresh ? <FiPause className="w-4 h-4" /> : <FiPlay className="w-4 h-4" />}
              <span>Auto ({autoRefresh ? `${countdown}s` : 'Tắt'})</span>
            </button>

            {/* Manual refresh button */}
            <button
              onClick={() => fetchRealtimeData(false)}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-white/15 hover:bg-white/25 text-cream border border-white/20 transition-all shadow-sm disabled:opacity-50"
              title="Làm mới dữ liệu ngay"
            >
              <FiRefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-gold' : ''}`} />
              <span>Làm mới</span>
            </button>

            {/* Export CSV button */}
            <button
              onClick={handleExportCSV}
              disabled={activeParticipants.length === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-gold to-light-tea-brown text-white shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 border border-gold/50"
            >
              <FiDownload className="w-4 h-4" />
              <span>Xuất Excel / CSV ({activeParticipants.length})</span>
            </button>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-sage/20 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-xs font-medium text-warm-gray uppercase tracking-wider">Tổng Đăng Ký</p>
              <h3 className="text-3xl font-display font-bold text-deep-green mt-1">
                {loading ? '...' : stats.total}
              </h3>
              <p className="text-xs text-sage mt-1">Người tham gia sự kiện</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-deep-green/10 flex items-center justify-center text-deep-green">
              <FiUsers className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-sage/20 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-xs font-medium text-warm-gray uppercase tracking-wider">Đã Làm Test</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-3xl font-display font-bold text-emerald-700">
                  {loading ? '...' : stats.completed}
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {stats.completionRate}%
                </span>
              </div>
              <p className="text-xs text-sage mt-1">Có kết quả mùi hương</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <FiCheckCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-sage/20 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-xs font-medium text-warm-gray uppercase tracking-wider">Chưa Làm Test</p>
              <h3 className="text-3xl font-display font-bold text-amber-700 mt-1">
                {loading ? '...' : stats.pending}
              </h3>
              <p className="text-xs text-sage mt-1">Đang chờ trải nghiệm</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600">
              <FiClock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-sage/20 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-xs font-medium text-warm-gray uppercase tracking-wider">Top Dấu Ấn</p>
              <h3 className="text-lg font-display font-bold text-light-tea-brown mt-1 truncate max-w-[180px]" title={stats.topScent}>
                {loading ? '...' : stats.topScent}
              </h3>
              <p className="text-xs text-sage mt-1">Phổ biến nhất</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
              <FiAward className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filter & Search Controls */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-sm border border-sage/20 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search input */}
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-gray w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm theo Tên, MSSV, Email, Dấu ấn..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sage/40 bg-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-deep-green/50 transition-all placeholder:text-warm-gray"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray hover:text-tea-brown text-xs"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Date Filter */}
              <div className="flex items-center gap-2 bg-cream/70 px-3 py-1.5 rounded-xl border border-sage/30">
                <FiCalendar className="text-deep-green w-4 h-4" />
                <span className="text-xs font-medium text-deep-green">Từ ngày:</span>
                <input
                  type="date"
                  value={startDateFilter}
                  onChange={(e) => setStartDateFilter(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-semibold text-tea-brown focus:outline-none cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2 bg-cream/70 px-3 py-1.5 rounded-xl border border-sage/30">
                <FiFilter className="text-deep-green w-4 h-4" />
                <span className="text-xs font-medium text-deep-green">Trạng thái:</span>
                <select
                  value={statusFilter}
                  onChange={(e: any) => setStatusFilter(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-semibold text-tea-brown focus:outline-none cursor-pointer"
                >
                  <option value="ALL">Tất cả ({activeParticipants.length})</option>
                  <option value="COMPLETED">Đã làm test ({stats.completed})</option>
                  <option value="PENDING">Chưa làm ({stats.pending})</option>
                </select>
              </div>

              {availableScents.length > 0 && (
                <div className="flex items-center gap-2 bg-cream/70 px-3 py-1.5 rounded-xl border border-sage/30">
                  <FiStar className="text-gold w-4 h-4" />
                  <span className="text-xs font-medium text-deep-green">Dấu ấn:</span>
                  <select
                    value={scentFilter}
                    onChange={(e) => setScentFilter(e.target.value)}
                    className="bg-transparent text-xs sm:text-sm font-semibold text-tea-brown focus:outline-none cursor-pointer max-w-[160px] sm:max-w-[200px]"
                  >
                    <option value="ALL">Tất cả dấu ấn</option>
                    {availableScents.map((scent) => (
                      <option key={scent} value={scent}>
                        {scent} ({stats.scentCounts[scent] || 0})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl text-red-700 flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => fetchRealtimeData(false)}
              className="text-xs font-semibold underline hover:text-red-900"
            >
              Thử lại ngay
            </button>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-sage/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-deep-green/10 text-deep-green font-display text-xs uppercase tracking-wider border-b border-sage/20">
                  <th className="py-4 px-4 font-bold text-center w-12">#</th>
                  <th className="py-4 px-4 font-bold">Người Tham Gia</th>
                  <th className="py-4 px-4 font-bold">MSSV</th>
                  <th className="py-4 px-4 font-bold">Thời Gian Đăng Ký</th>
                  <th className="py-4 px-4 font-bold text-center">Trạng Thái</th>
                  <th className="py-4 px-4 font-bold">Dấu Ấn Mùi Hương</th>
                  <th className="py-4 px-4 font-bold">Công Thức Tinh Dầu</th>
                  <th className="py-4 px-4 font-bold text-center">Chi Tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage/15 text-sm">
                {loading && participants.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-warm-gray">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <FiRefreshCw className="w-8 h-8 animate-spin text-deep-green" />
                        <span className="text-base font-medium">Đang tải dữ liệu realtime...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredParticipants.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-warm-gray">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <FiFileText className="w-8 h-8 text-sage" />
                        <span className="text-base">Không tìm thấy người tham gia nào phù hợp.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredParticipants.map((p, idx) => {
                    const latestResult = p.results && p.results.length > 0 ? p.results[0] : null;
                    const isNew = isRecentRecord(p.createdAt);

                    return (
                      <tr
                        key={p.id}
                        className={`transition-colors hover:bg-cream/60 ${
                          isNew ? 'bg-emerald-50/50' : ''
                        }`}
                      >
                        <td className="py-4 px-4 text-center font-semibold text-warm-gray">
                          {idx + 1}
                        </td>
                        <td className="py-4 px-4 font-medium text-tea-brown">
                          <div className="flex items-center gap-2">
                            <span>{p.fullName}</span>
                            {isNew && (
                              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white rounded-full animate-pulse shadow-sm">
                                Mới
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-warm-gray block md:hidden">{p.email}</span>
                        </td>
                        <td className="py-4 px-4 font-mono text-xs text-light-tea-brown font-semibold">
                          {p.studentId}
                        </td>
                        <td className="py-4 px-4 text-xs text-gray-600">
                          {p.createdAt ? new Date(p.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '---'}
                          <span className="block text-[11px] text-warm-gray">
                            {p.createdAt ? new Date(p.createdAt).toLocaleDateString('vi-VN') : ''}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {latestResult ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <FiCheckCircle className="w-3.5 h-3.5" />
                              Đã làm
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                              <FiClock className="w-3.5 h-3.5" />
                              Chưa làm
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 font-display font-bold text-deep-green">
                          {latestResult?.scentIdentity ? (
                            <span className="flex items-center gap-1.5">
                              <FiStar className="text-gold w-4 h-4 flex-shrink-0" />
                              <span>{latestResult.scentIdentity}</span>
                            </span>
                          ) : (
                            <span className="text-warm-gray font-sans text-xs italic">---</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          {latestResult?.formula && latestResult.formula.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5 max-w-xs">
                              {latestResult.formula.map((item, fIdx) => (
                                <span
                                  key={fIdx}
                                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-cream border border-sage/30 text-light-tea-brown"
                                >
                                  {item.name}: <strong className="text-tea-brown">{item.drops}g</strong>
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-warm-gray text-xs italic">---</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => setSelectedParticipant(p)}
                            className="p-2 rounded-xl bg-deep-green/10 hover:bg-deep-green text-deep-green hover:text-white transition-all shadow-sm active:scale-95"
                            title="Xem chi tiết"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          
          <div className="bg-cream/40 px-6 py-3 border-t border-sage/20 flex flex-col sm:flex-row justify-between items-center text-xs text-warm-gray gap-2">
            <span>Hiển thị {filteredParticipants.length} trên tổng số {activeParticipants.length} người tham gia (từ ngày {startDateFilter ? new Date(startDateFilter).toLocaleDateString('vi-VN') : 'tất cả'})</span>
            <span>Trang tự động tải lại mỗi 5 giây khi bật chế độ Auto.</span>
          </div>
        </div>
      </div>

      {/* Modal View Detail */}
      {selectedParticipant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-sage/30 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-deep-green to-tea-brown p-6 text-white relative">
              <button
                onClick={() => setSelectedParticipant(null)}
                className="absolute right-5 top-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold text-gold tracking-widest uppercase">Thông Tin Người Tham Gia</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mt-1">{selectedParticipant.fullName}</h2>
              <div className="flex flex-wrap gap-4 mt-2 text-xs text-blush">
                <span>MSSV: <strong className="text-white">{selectedParticipant.studentId}</strong></span>
                <span>Email: <strong className="text-white">{selectedParticipant.email}</strong></span>
                {selectedParticipant.createdAt && (
                  <span>Đăng ký: <strong className="text-white">{new Date(selectedParticipant.createdAt).toLocaleString('vi-VN')}</strong></span>
                )}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {selectedParticipant.results && selectedParticipant.results.length > 0 ? (
                (() => {
                  const res = selectedParticipant.results[0];
                  return (
                    <div className="space-y-6">
                      {/* Scent Identity */}
                      <div className="bg-cream/70 rounded-2xl p-5 border border-sage/30 text-center">
                        <p className="text-xs text-sage font-medium uppercase tracking-wider">Dấu ấn mùi hương</p>
                        <h3 className="font-display text-2xl font-bold text-deep-green mt-1">
                          {res.scentIdentity}
                        </h3>
                        <p className="text-sm italic text-gray-600 mt-2 leading-relaxed font-body">
                          {res.personalityDescription}
                        </p>
                      </div>

                      {/* Formula */}
                      {res.formula && res.formula.length > 0 && (
                        <div>
                          <h4 className="font-display font-bold text-sm text-deep-green uppercase tracking-wider mb-3">
                            🧪 Công Thức Tinh Dầu
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {res.formula.map((item, idx) => (
                              <div key={idx} className="bg-white p-3 rounded-xl border border-sage/30 shadow-sm text-center">
                                <span className="text-xs text-warm-gray block">{item.name}</span>
                                <span className="font-display font-bold text-lg text-light-tea-brown">{item.drops} giọt</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Scent Description */}
                      {res.scentDescription && (
                        <div className="bg-blush/20 rounded-2xl p-4 border border-blush/40">
                          <h4 className="font-display font-bold text-xs text-deep-green uppercase tracking-wider mb-1">
                            🌸 Mô Tả Mùi Hương
                          </h4>
                          <p className="text-sm text-gray-700 leading-relaxed italic">
                            {res.scentDescription}
                          </p>
                        </div>
                      )}

                      {/* Quiz Answers breakdown if available */}
                      {res.answers && res.answers.length > 0 && (
                        <div>
                          <h4 className="font-display font-bold text-sm text-deep-green uppercase tracking-wider mb-2">
                            📝 Chi Tiết Câu Trả Lời ({res.answers.length} câu)
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {res.answers.map((ans, aIdx) => (
                              <div key={aIdx} className="bg-cream/40 p-2.5 rounded-lg border border-sage/20 text-xs">
                                <span className="text-warm-gray font-medium">Câu {ans.questionId}: </span>
                                <strong className="text-tea-brown">{ans.option}</strong>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()
              ) : (
                <div className="py-12 text-center bg-cream/40 rounded-2xl border border-sage/30">
                  <FiClock className="w-10 h-10 text-amber-500 mx-auto mb-2 animate-pulse" />
                  <h4 className="font-display font-bold text-lg text-tea-brown">Chưa hoàn thành khảo sát</h4>
                  <p className="text-sm text-warm-gray mt-1">Người tham gia này mới đăng ký thông tin và chưa thực hiện trắc nghiệm mùi hương.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-cream/50 px-6 py-4 border-t border-sage/20 flex justify-end">
              <button
                onClick={() => setSelectedParticipant(null)}
                className="px-6 py-2 rounded-xl font-semibold bg-deep-green text-white hover:bg-[#3A4D3A] transition-colors text-sm shadow-md"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
