import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function statusClass(status?: string) {
  if (!status) return 'badge status-new';
  return `badge status-${status}`;
}

export function priorityClass(priority?: string) {
  if (!priority) return 'priority-dot priority-medium';
  return `priority-dot priority-${priority}`;
}
