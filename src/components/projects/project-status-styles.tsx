"use client";

import { Project } from "../../../db/schema";

export const statusColors = {
  won: {
    bg: "bg-green-500/5",
    hover: "hover:bg-green-500/10",
    border: "border-green-500",
    text: "text-green-500",
    badge: "success",
    icon: "🎉",
    description: "Successfully won projects"
  },
  lost: {
    bg: "bg-gray-500/5",
    hover: "hover:bg-gray-500/10",
    border: "border-gray-500",
    text: "text-gray-500",
    badge: "destructive",
    icon: "😔",
    description: "Unsuccessful bids"
  },
  nearDeadline: {
    bg: "bg-red-500/5",
    hover: "hover:bg-red-500/10",
    border: "border-red-500",
    text: "text-red-500",
    badge: "destructive",
    icon: "⏰",
    description: "Projects due within 7 days"
  },
  inProgress: {
    bg: "bg-blue-500/5",
    hover: "hover:bg-blue-500/10",
    border: "border-blue-500",
    text: "text-blue-500",
    badge: "secondary",
    icon: "🔄",
    description: "Active bids"
  }
};

export function getProjectStyle(project: Project) {
  const deadline = project.bidsDeadline ? new Date(project.bidsDeadline) : new Date();
  const today = new Date();
  const daysUntilDeadline = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const status = project.status.toLowerCase();
  let styleKey: keyof typeof statusColors = 'inProgress';

  if (status === "won") {
    styleKey = 'won';
  } else if (status === "lost") {
    styleKey = 'lost';
  } else if (daysUntilDeadline <= 7 && daysUntilDeadline >= 0) {
    styleKey = 'nearDeadline';
  }

  const colors = statusColors[styleKey];
  
  return {
    row: `${colors.bg} ${colors.hover} cursor-pointer transition-colors duration-200`,
    badge: colors.badge,
    text: colors.text,
    border: colors.border,
    icon: colors.icon,
    description: colors.description,
    isNearDeadline: styleKey === 'nearDeadline',
    daysLeft: daysUntilDeadline,
    bg: colors.bg
  };
}

export function ProjectStatusIndicator({ project }: { project: Project }) {
  const style = getProjectStyle(project);
  
  return (
    <div className={`flex items-center gap-2 ${style.text}`}>
      <span className="text-lg">{style.icon}</span>
      <span className="text-sm font-medium">
        {style.isNearDeadline 
          ? `${style.daysLeft} days left`
          : project.status}
      </span>
    </div>
  );
}

export function ProjectStatusBadge({ project }: { project: Project }) {
  const style = getProjectStyle(project);
  
  return (
    <div className={`
      px-2 py-1 rounded-full text-sm font-medium
      ${style.bg} ${style.text} border
      ${style.border} inline-flex items-center gap-1
    `}>
      {style.icon} {project.status}
    </div>
  );
} 