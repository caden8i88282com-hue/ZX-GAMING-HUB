// Simple script for ZX-GAMING-HUB
document.addEventListener('DOMContentLoaded', function() {
    console.log('ZX-GAMING-HUB loaded');

    // WiFi Traffic Monitor - runs continuously
    function updateTrafficInfo() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            document.getElementById('traffic-info').innerText = 
                `Online: ${navigator.onLine} | Type: ${connection.effectiveType || 'unknown'} | Downlink: ${connection.downlink || 'unknown'} Mbps`;
        } else {
            document.getElementById('traffic-info').innerText = 
                `Online: ${navigator.onLine} | Connection info not available`;
        }
    }

    // Update traffic info every second
    setInterval(updateTrafficInfo, 1000);
    updateTrafficInfo(); // Initial call

    // WiFi Speed Checker
    document.getElementById('start-speed-test').addEventListener('click', function() {
        const resultsEl = document.getElementById('speed-results');
        resultsEl.innerText = 'Testing...';

        // Simple download speed test
        const testFile = 'https://speed.cloudflare.com/__down?bytes=10485760'; // 10MB file
        const startTime = Date.now();

        fetch(testFile)
            .then(response => response.blob())
            .then(blob => {
                const endTime = Date.now();
                const duration = (endTime - startTime) / 1000; // seconds
                const bitsLoaded = 10 * 8 * 1024 * 1024; // 10MB in bits
                const speedBps = bitsLoaded / duration;
                const speedMbps = (speedBps / (1024 * 1024)).toFixed(2);
                resultsEl.innerText = `Download: ${speedMbps} Mbps | Upload: Not tested`;
            })
            .catch(error => {
                resultsEl.innerText = 'Error testing speed: ' + error.message;
            });
    });

    // Auto-run speed test every 60 seconds
    setInterval(() => {
        document.getElementById('start-speed-test').click();
    }, 60000);
});