export const formatTimeAgo = (timestamp: string): string => {
  try {
    const now = new Date();
    const timestampDate = new Date(timestamp);
    const diffMs = now.getTime() - timestampDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}天前`;
    } else if (diffHours > 0) {
      return `${diffHours}小时前`;
    } else {
      return "刚刚";
    }
  } catch (error) {
    return "未知时间";
  }
}; 