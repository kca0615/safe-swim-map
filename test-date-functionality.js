// Simple test to verify date functionality
const fs = require('fs');

// Read the generated GeoJSON file
const data = JSON.parse(fs.readFileSync('public/data/californiaGeoData.json', 'utf8'));

console.log('Testing date functionality in GeoJSON data...\n');

// Check first few features for date properties
const testFeatures = data.features.slice(0, 3);

testFeatures.forEach((feature, index) => {
  console.log(`Feature ${index + 1}: ${feature.properties.name}`);
  console.log(`  Sample Date: ${feature.properties.sampleDate}`);
  console.log(`  Data Retrieval Date: ${feature.properties.dataRetrievalDate}`);
  console.log(`  Status: ${feature.properties.status}`);
  console.log(`  pH: ${feature.properties.ph}`);
  console.log('---');
});

// Verify all features have the required date properties
const featuresWithDates = data.features.filter(feature => 
  feature.properties.sampleDate && feature.properties.dataRetrievalDate
);

console.log(`\nTotal features: ${data.features.length}`);
console.log(`Features with date information: ${featuresWithDates.length}`);
console.log(`Success rate: ${(featuresWithDates.length / data.features.length * 100).toFixed(1)}%`);

if (featuresWithDates.length === data.features.length) {
  console.log('✅ All features have date information!');
} else {
  console.log('❌ Some features are missing date information');
}
