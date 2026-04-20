// ZX-GAMING-HUB Tab System
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

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
    const startSpeedTestBtn = document.getElementById('start-speed-test');
    if (startSpeedTestBtn) {
        startSpeedTestBtn.addEventListener('click', function() {
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
            startSpeedTestBtn.click();
        }, 60000);
    }
});