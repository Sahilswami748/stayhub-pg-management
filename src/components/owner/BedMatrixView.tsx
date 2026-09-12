import React, { useState } from 'react';
import { Bed, Room } from '../../types';
import { useStore } from '../../store/useStore';
import { getStatusBadge, formatCurrency } from '../../utils/helpers';
import { Grid, Filter, CheckCircle2, User, ArrowRightLeft, ShieldAlert, Sparkles, Plus, AlertCircle } from 'lucide-react';

export const BedMatrixView: React.FC = () => {
  const { rooms, beds, tenants, allocateBed, transferBed, updateBedStatus } = useStore();
  const [selectedFloor, setSelectedFloor] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [transferModalBed, setTransferModalBed] = useState<Bed | null>(null);
  const [targetBedId, setTargetBedId] = useState<string>('');
  const [transferReason, setTransferReason] = useState<string>('');

  const filteredRooms = rooms.filter(r => {
    if (selectedFloor !== 'ALL' && r.floorId !== selectedFloor) return false;
    if (selectedStatus !== 'ALL' && r.status !== selectedStatus) return false;
    return true;
  });

  const availableBedsForTransfer = beds.filter(b => b.status === 'AVAILABLE');

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferModalBed?.currentTenantId || !targetBedId) return;
    transferBed(transferModalBed.currentTenantId, targetBedId, transferReason || 'Tenant preference');
    setTransferModalBed(null);
    setTargetBedId('');
    setTransferReason('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Real-Time Bed & Room Matrix</h1>
          <p className="text-xs text-slate-500">Visual seat allocation, status controls & tenant transfer engine</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Occupied
          </span>
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Available
          </span>
          <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-500" /> Reserved
          </span>
          <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500" /> Maintenance
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Filter className="h-4 w-4 text-slate-400" />
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Filter by:</span>

        <select
          value={selectedFloor}
          onChange={(e) => setSelectedFloor(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <option value="ALL">All Floors</option>
          <option value="flr-1">1st Floor</option>
          <option value="flr-2">2nd Floor</option>
          <option value="flr-3">3rd Floor</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <option value="ALL">All Room Statuses</option>
          <option value="AVAILABLE">Available</option>
          <option value="FULL">Full</option>
          <option value="PARTIALLY_OCCUPIED">Partially Occupied</option>
        </select>
      </div>

      {/* Room Matrix Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRooms.map(room => {
          const roomBeds = beds.filter(b => b.roomId === room.id);
          return (
            <div
              key={room.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              {/* Room Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-slate-900 dark:text-white">Room {room.roomNumber}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${getStatusBadge(room.status)}`}>
                      {room.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {room.acType} • {room.capacity} Bed Capacity • {formatCurrency(room.monthlyRent)}/mo
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {room.currentOccupancy} / {room.capacity} Occupied
                  </span>
                </div>
              </div>

              {/* Beds list */}
              <div className="mt-4 space-y-3">
                {roomBeds.map(bed => {
                  const isOccupied = bed.status === 'OCCUPIED';
                  const isAvailable = bed.status === 'AVAILABLE';
                  const isReserved = bed.status === 'RESERVED';

                  return (
                    <div
                      key={bed.id}
                      className={`flex items-center justify-between rounded-2xl border p-3 text-xs transition-all ${
                        isOccupied
                          ? 'border-blue-200 bg-blue-50/40 dark:border-blue-900/40 dark:bg-blue-950/20'
                          : isAvailable
                          ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-emerald-950/20'
                          : 'border-purple-200 bg-purple-50/40 dark:border-purple-900/40 dark:bg-purple-950/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-xl font-bold text-white ${
                            isOccupied ? 'bg-blue-600' : isAvailable ? 'bg-emerald-500' : 'bg-purple-600'
                          }`}
                        >
                          {bed.bedNumber.replace('Bed ', '')}
                        </div>

                        <div>
                          <p className="font-extrabold text-slate-800 dark:text-slate-200">{bed.bedNumber}</p>
                          <p className="text-[11px] text-slate-500">
                            {isOccupied ? (
                              <span className="font-semibold text-blue-700 dark:text-blue-300">
                                Resident: {bed.currentTenantName}
                              </span>
                            ) : isReserved ? (
                              <span className="text-purple-700 dark:text-purple-300">Reserved for Joining</span>
                            ) : (
                              <span className="text-emerald-700 dark:text-emerald-400">Ready to Occupy</span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5">
                        {isOccupied && (
                          <button
                            onClick={() => setTransferModalBed(bed)}
                            className="flex items-center gap-1 rounded-xl bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
                            title="Move Tenant to another bed"
                          >
                            <ArrowRightLeft className="h-3 w-3 text-brand-600" />
                            <span>Transfer</span>
                          </button>
                        )}

                        {isAvailable && (
                          <button
                            onClick={() => updateBedStatus(bed.id, 'RESERVED')}
                            className="rounded-xl border border-purple-300 bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-700 hover:bg-purple-100"
                          >
                            Reserve
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Transfer Modal */}
      {transferModalBed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Transfer Resident ({transferModalBed.currentTenantName})
            </h2>
            <p className="text-xs text-slate-500">Currently in Room {transferModalBed.roomId} ({transferModalBed.bedNumber})</p>

            <form onSubmit={handleTransferSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Select Target Available Bed
                </label>
                <select
                  required
                  value={targetBedId}
                  onChange={(e) => setTargetBedId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-medium text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="">-- Choose Target Bed --</option>
                  {availableBedsForTransfer.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.id} ({b.bedNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Reason for Transfer
                </label>
                <input
                  type="text"
                  placeholder="e.g. AC Room Upgrade, Floor preference"
                  value={transferReason}
                  onChange={(e) => setTransferReason(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-medium text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTransferModalBed(null)}
                  className="w-1/2 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 rounded-xl bg-brand-600 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-700"
                >
                  Confirm Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
