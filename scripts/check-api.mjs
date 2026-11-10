const apiUrl = process.env.AIDAN_API_URL ?? process.env.EXPO_PUBLIC_API_URL;
if (!apiUrl || !/^https?:\/\//i.test(apiUrl)) {
  console.error('Set AIDAN_API_URL to your running backend base URL (for example http://127.0.0.1:8000).');
  process.exit(1);
}
try {
  const response = await fetch(`${apiUrl.replace(/\/+$/, '')}/health`, { signal: AbortSignal.timeout(12000) });
  const body = await response.text();
  console.log(`HTTP ${response.status}: ${body}`);
  if (!response.ok) process.exitCode = 1;
} catch (err) {
  console.error('API health check failed:', err instanceof Error ? err.message : String(err));
  process.exitCode = 1;
}
