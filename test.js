const { db, insertTranscript, getTranscripts, saveSummary, getSummary } = require('./server/db');

async function runTests() {
  console.log('--- RUNNING DIAGNOSTIC TESTS ---');
  
  // 1. Test Database
  console.log('\n1. Testing SQLite Database...');
  const testRoomId = 'test-room-' + Date.now();
  try {
    const insertId = await insertTranscript(testRoomId, 'System', 'Hello world', '10:00 AM');
    console.log(`✅ Inserted transcript successfully (ID: ${insertId})`);
    
    const transcripts = await getTranscripts(testRoomId);
    if (transcripts.length === 1 && transcripts[0].text === 'Hello world') {
      console.log(`✅ Retrieved transcript successfully.`);
    } else {
      console.log(`❌ Failed to retrieve transcript correctly.`);
    }
    
    await saveSummary(testRoomId, 'This is a test summary.');
    console.log(`✅ Saved summary successfully.`);
    
    const summary = await getSummary(testRoomId);
    if (summary === 'This is a test summary.') {
      console.log(`✅ Retrieved summary successfully.`);
    } else {
      console.log(`❌ Failed to retrieve summary correctly.`);
    }
  } catch(err) {
    console.log(`❌ Database Test Failed: ${err.message}`);
  }

  // 2. Test Ollama
  console.log('\n2. Testing Ollama Connection...');
  try {
    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt: 'Say the exact word: "SUCCESS"',
        stream: false
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Ollama connected and generated response: "${data.response.trim()}"`);
    } else {
      console.log(`❌ Ollama returned status: ${response.status}`);
    }
  } catch (err) {
    console.log(`❌ Ollama Connection Failed: ${err.message}`);
  }
  
  console.log('\n--- TESTS COMPLETE ---');
  process.exit(0);
}

// Wait a second for DB to initialize
setTimeout(runTests, 1000);
