// Test to verify tooltip functionality with date information
const fs = require('fs');

// Read the GeoJSON data
const data = JSON.parse(fs.readFileSync('public/data/californiaGeoData.json', 'utf8'));

// Simulate the formatDate function from the component
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return "N/A";
  }
};

// Simulate tooltip generation for a few sample features
console.log('Testing tooltip functionality with date information...\n');

const testFeatures = data.features.slice(0, 5);

testFeatures.forEach((feature, index) => {
  const { name, status, ph, sampleDate, dataRetrievalDate } = feature.properties;
  
  console.log(`=== Feature ${index + 1} ===`);
  console.log(`Location: ${name || "Unknown Location"}`);
  console.log(`Status: ${status || "N/A"}`);
  console.log(`pH Level: ${ph || "N/A"}`);
  console.log(`Sample Date: ${formatDate(sampleDate)}`);
  console.log(`Data Retrieved: ${formatDate(dataRetrievalDate)}`);
  
  // Simulate the HTML tooltip content
  const tooltipHTML = `<div>
    <strong>${name || "Unknown Location"}</strong><br>
    Status: ${status || "N/A"}<br>
    pH Level: ${ph || "N/A"}<br>
    Sample Date: ${formatDate(sampleDate)}<br>
    <small style="color: #666;">Data Retrieved: ${formatDate(dataRetrievalDate)}</small>
  </div>`;
  
  console.log('Generated Tooltip HTML:');
  console.log(tooltipHTML);
  console.log('\n');
});

// Verify data integrity
const featuresWithDates = data.features.filter(feature => 
  feature.properties.sampleDate && feature.properties.dataRetrievalDate
);

console.log(`\n=== Data Integrity Check ===`);
console.log(`Total features: ${data.features.length}`);
console.log(`Features with complete date info: ${featuresWithDates.length}`);
console.log(`Success rate: ${(featuresWithDates.length / data.features.length * 100).toFixed(1)}%`);

if (featuresWithDates.length === data.features.length) {
  console.log('✅ All features have complete date information!');
  console.log('✅ Tooltip functionality should work correctly!');
} else {
  console.log('❌ Some features are missing date information');
  
  // Show which features are missing data
  const missingData = data.features.filter(feature => 
    !feature.properties.sampleDate || !feature.properties.dataRetrievalDate
  );
  
  console.log('\nFeatures missing date data:');
  missingData.slice(0, 5).forEach((feature, index) => {
    console.log(`${index + 1}. ${feature.properties.name || 'Unknown'} - Missing: ${
      !feature.properties.sampleDate ? 'sampleDate ' : ''
    }${!feature.properties.dataRetrievalDate ? 'dataRetrievalDate' : ''}`);
  });
}
