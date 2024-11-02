export const formatDate = (isoDate: Date) => {
  const formattedDate = isoDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return formattedDate;
};

export const formatTime = (isoDate: Date) => {
  const formattedTime = isoDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return formattedTime;
};
