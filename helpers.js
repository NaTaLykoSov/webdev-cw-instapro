export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}
export function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  const interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
      return interval + " лет назад";
  } else if (interval === 1) {
      return interval + " год назад";
  }

  const months = Math.floor(seconds / 2628000);
  if (months > 1) {
      return months + " месяцев назад";
  } else if (months === 1) {
      return months + " месяц назад";
  }

  const days = Math.floor(seconds / 86400);
  if (days > 1) {
      return days + " дней назад";
  } else if (days === 1) {
      return days + " день назад";
  }

  const hours = Math.floor(seconds / 3600);
  if (hours > 1) {
      return hours + " часов назад";
  } else if (hours === 1) {
      return hours + " час назад";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes > 1) {
      return minutes + " минут назад";
  } else if (minutes === 1) {
      return minutes + " минуту назад";
  }

  return "только что";
}

export function cheakOnline() {if (!navigator.onLine) {
  throw new Error("Нет интернета");
}} 
