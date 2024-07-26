export async function fetchDashboardData() {
    const response = await fetch('http://localhost:3010/dashboard/metrics');
    return response.json(); 
  }
export async function updatePointsConfig(data) {
  console.log(data); // Add this line

  const response = await fetch('http://localhost:3010/points-configuration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to send data');
  }

  return response.json();
}