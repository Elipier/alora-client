export default async function name(text: string) {
  const res = await fetch("http://localhost:8010/v2/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `text=${encodeURIComponent(text)}&language=fr`,
  });

  const data = await res.json();
  return data;
}
