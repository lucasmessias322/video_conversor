// função para formatar o tempo
export default function msConversion(millis) {
  const sec = Math.floor(millis / 1000);
  const hrs = Math.floor(sec / 3600);
  const min = Math.floor((sec - hrs * 3600) / 60);
  const seconds = sec % 60;

  const hourStr = hrs > 0 ? `${hrs}:` : "";
  const minuteStr = `${String(min).padStart(2, "0")}:`;
  const secondStr = `${String(seconds).padStart(2, "0")}`;

  return `${hourStr}${minuteStr}${secondStr}`;
}
