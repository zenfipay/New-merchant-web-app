"use client";
import * as React from "react";
import Image from "next/image";
import { CustomCheckbox } from "../custom/CustomCheckbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// TABLE TYPES
export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  className?: string;
}

export interface TableAction<T> {
  label: string;
  icon?: string;
  onClick: (row: T) => void;
  condition?: (row: T) => boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  selectedRows?: string[];
  onSelectAll?: (checked: boolean) => void;
  onSelectRow?: (id: string, checked: boolean) => void;
  actions?: TableAction<T>[];
  rowKey: keyof T;
  selectable?: boolean;
  detailsPanel?: (row: T, onClose: () => void) => React.ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  selectedRows = [],
  onSelectAll,
  onSelectRow,
  actions = [],
  rowKey,
  selectable = false,
  detailsPanel,
}: DataTableProps<T>) {
  const [showDetails, setShowDetails] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<T | null>(null);

  const handleViewDetails = (row: T) => {
    setSelectedRow(row);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedRow(null);
  };

  return (
    <>
      <table className="w-full text-sm text-left border-collapse outline outline-[#F5F5F5] rounded-xl overflow-hidden">
        <thead className="bg-[#F5F5F5]">
          <tr>
            {selectable && (
              <th className="py-[16.5px] px-3 text-[12px] text-[#7D7D7D] font-medium">
                <CustomCheckbox
                  id="select-all"
                  label={columns[0]?.label || "Select"}
                  checked={selectedRows.length === data.length && data.length > 0}
                  onChange={onSelectAll!}
                  className="text-[#7D7D7D]"
                />
              </th>
            )}
            {columns.slice(selectable ? 1 : 0).map((column, index) => (
              <th
                key={index}
                className={`py-[16.5px] px-3 text-[12px] text-[#7D7D7D] font-medium ${
                  column.className || ""
                }`}
              >
                {column.label}
              </th>
            ))}
            {actions.length > 0 && <th></th>}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => {
            const rowId = String(row[rowKey]);
            return (
              <tr key={rowId} className="hover:bg-[#FAFAFA]">
                {selectable && (
                  <td className="px-3">
                    <CustomCheckbox
                      id={`checkbox-${i}`}
                      label={rowId}
                      checked={selectedRows.includes(rowId)}
                      onChange={(checked) => onSelectRow!(rowId, checked)}
                    />
                  </td>
                )}
                {columns.slice(selectable ? 1 : 0).map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`py-[16.5px] px-3 text-[12px] ${
                      column.className || ""
                    }`}
                  >
                    {column.render
                      ? column.render(row[column.key as keyof T], row)
                      : String(row[column.key as keyof T])}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className="py-[16.5px] px-3 text-[12px]">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          title="more"
                          type="button"
                          className="bg-[#EEF3FF] w-8 h-8 rounded-lg border p-1.5"
                        >
                          <Image
                            src="/icons/ellipsesBlue.svg"
                            alt="menu"
                            width={16}
                            height={16}
                          />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {actions
                          .filter(
                            (action) => !action.condition || action.condition(row)
                          )
                          .map((action, actionIndex) => (
                            <DropdownMenuItem
                              key={actionIndex}
                              onClick={() => action.onClick(row)}
                              className={`data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF] ${
                                action.className || ""
                              }`}
                            >
                              {action.label}
                            </DropdownMenuItem>
                          ))}
                        {detailsPanel && (
                          <DropdownMenuItem
                            role="button"
                            onClick={() => handleViewDetails(row)}
                            className="data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF]"
                          >
                            <span>View details</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* DETAILS MODAL */}
      {showDetails && selectedRow && detailsPanel && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleCloseDetails();
          }}
          className="fixed inset-0 z-50 w-full bg-[#20195F]/10 backdrop-blur-lg flex flex-col overflow-y-auto"
        >
          {detailsPanel(selectedRow, handleCloseDetails)}
        </div>
      )}
    </>
  );
}