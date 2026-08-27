export const getAvatarGradient = (name: string = "C") => {
  const gradients = [
    "from-indigo-500 to-purple-600 text-white",
    "from-blue-500 to-cyan-600 text-white",
    "from-emerald-500 to-teal-600 text-white",
    "from-rose-500 to-pink-600 text-white",
    "from-amber-500 to-orange-600 text-white",
  ];
  const charCodeSum = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gradients[charCodeSum % gradients.length];
};

export const formatSalary = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(amount);

export const formattedDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
