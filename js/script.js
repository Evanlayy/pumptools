document.addEventListener('DOMContentLoaded', () => {
    let webhookUrl = localStorage.getItem('webhookUrl') || '';
    const webhookInput = document.getElementById('webhook-url');
    const modal = document.getElementById('guideModal');
    const nextButton = document.getElementById('nextStep');
    const progress = document.querySelector('.progress');
    const progressText = document.querySelector('.progress-text');
    
    webhookInput.value = webhookUrl;

    // Guide step tracking
    let currentStep = 1;
    const totalSteps = 3;

    function updateProgress() {
        const percentage = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);
        progress.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}%`;
        
        const startColor = {r: 102, g: 102, b: 102};
        const endColor = {r: 76, g: 175, b: 80};
        
        const r = Math.round(startColor.r + (endColor.r - startColor.r) * (percentage / 100));
        const g = Math.round(startColor.g + (endColor.g - startColor.g) * (percentage / 100));
        const b = Math.round(startColor.b + (endColor.b - startColor.b) * (percentage / 100));
        
        nextButton.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        
        if (currentStep > totalSteps) {
            modal.classList.remove('show');
        } else {
            document.querySelectorAll('.guide-step').forEach(step => {
                step.classList.remove('active');
            });
            document.querySelector(`.guide-step[data-step="${currentStep}"]`).classList.add('active');
            
            nextButton.textContent = currentStep === totalSteps ? 'Get Started' : 'Next Step';
        }
    }

    modal.classList.add('show');
    updateProgress();

    nextButton.addEventListener('click', () => {
        currentStep++;
        updateProgress();
    });

    // Save webhook URL with monitoring animation
    document.getElementById('save-webhook').addEventListener('click', function() {
        webhookUrl = webhookInput.value;
        
        // Validate webhook URL
        if (!webhookUrl.startsWith('https://discord')) {
            webhookInput.classList.add('invalid');
            setTimeout(() => {
                webhookInput.classList.remove('invalid');
            }, 2000);
            return;
        }
        
        localStorage.setItem('webhookUrl', webhookUrl);
        this.classList.add('monitoring');
        this.disabled = true;
    });

    // Tool card functionality
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        const startButton = card.querySelector('.start-button');
        const toolInput = card.querySelector('.tool-input');
        
        startButton.addEventListener('click', () => {
            const toolName = card.querySelector('h2').textContent;
            const inputValue = toolInput.value;
            
            // Start the monitoring animation
            startButton.textContent = 'Running...';
            startButton.disabled = true;
            startButton.classList.add('monitoring');
            card.classList.add('active-monitoring');

            // Simulate monitoring for 30 seconds
            setTimeout(() => {
                startButton.textContent = 'Start';
                startButton.disabled = false;
                startButton.classList.remove('monitoring');
                card.classList.remove('active-monitoring');
            }, 30000); // 30 seconds
        });
    });
}); 