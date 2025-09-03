// services/api.js
const API_BASE_URL = 'http://192.168.21.64/api'; // Sesuaikan dengan URL yang ditemukan

// Generic function untuk fetch data
export const fetchFromAPI = async (endpoint) => {
  const fullUrl = `${API_BASE_URL}/${endpoint}`;
  console.log('Fetching from:', fullUrl); // Debug log
  
  try {
    const response = await fetch(fullUrl);
    console.log('Response status:', response.status); // Debug log
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Data received:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    console.error('URL attempted:', fullUrl);
    throw error;
  }
};

// Fungsi khusus untuk setiap endpoint (sesuaikan dengan response API)
export const getProfiles = () => fetchFromAPI('profiles');
export const getEducations = () => fetchFromAPI('educations');
export const getOrganizations = () => fetchFromAPI('organizations');
export const getSkills = () => fetchFromAPI('skills');
export const getProjects = () => fetchFromAPI('projects');

// Jika butuh POST request
export const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};