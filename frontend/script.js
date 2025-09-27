document.getElementById('lessonForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const lessonText = document.getElementById('lessonInput').value.trim();
    const gameOutput = document.getElementById('gameOutput');
    if (!lessonText) {
        gameOutput.innerHTML = '<p style="color:red;">Please enter lesson content.</p>';
        return;
    }
    // Simple conversion: create a quiz game from lesson text
    const sentences = lessonText.split('.').map(s => s.trim()).filter(s => s.length > 0);
    if (sentences.length < 2) {
        gameOutput.innerHTML = '<p style="color:red;">Please enter more content for a game.</p>';
        return;
    }
    let quizHtml = '<h2>Quiz Game</h2><ol>';
    sentences.forEach((sentence, idx) => {
        quizHtml += `<li>What is the main idea of: <em>"${sentence}"</em>?<br>
        <input type="text" placeholder="Your answer here"></li>`;
    });
    quizHtml += '</ol>';
    gameOutput.innerHTML = quizHtml;
});
