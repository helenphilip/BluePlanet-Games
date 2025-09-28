// Handle game type selection
document.querySelectorAll('.game-type-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.getElementById('gameType').value = this.getAttribute('data-type');
        document.querySelectorAll('.game-type-btn').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
    });
});

document.getElementById('lessonForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const lessonText = document.getElementById('lessonInput').value.trim();
    const gameType = document.getElementById('gameType').value;
    const gameOutput = document.getElementById('gameOutput');
    if (!lessonText) {
        gameOutput.innerHTML = '<p style="color:red;">Please enter lesson content.</p>';
        return;
    }
    const sentences = lessonText.split('.').map(s => s.trim()).filter(s => s.length > 0);
    if (sentences.length < 2) {
        gameOutput.innerHTML = '<p style="color:red;">Please enter more content for a game.</p>';
        return;
    }
    if (gameType === 'flashcards') {
        // Generate flashcards: front = first part, back = second part or main idea
        let flashHtml = '<h2>Flashcards</h2><div class="flashcards">';
        sentences.forEach((sentence, idx) => {
            let parts = sentence.split(/[:,\-]/);
            let front = parts[0].trim();
            let back = parts[1] ? parts[1].trim() : 'Main idea: ' + front;
            flashHtml += `<div class="flashcard"><div class="front">${front}</div><div class="back">${back}</div></div>`;
        });
        flashHtml += '</div>';
        gameOutput.innerHTML = flashHtml;
        document.querySelectorAll('.flashcard').forEach(card => {
            card.addEventListener('click', function() {
                this.classList.toggle('flipped');
            });
        });
        return;
    }
    if (gameType === 'matching') {
        // Generate matching key terms section only
        let keyTerms = [];
        sentences.forEach((sentence, idx) => {
            let terms = sentence.split(' ').filter(w => w.length > 6 || (w[0] && w[0] === w[0].toUpperCase()));
            keyTerms = keyTerms.concat(terms);
        });
        let matchHtml = '<h2>Match the Key Terms</h2>';
        if (keyTerms.length > 0) {
            keyTerms = Array.from(new Set(keyTerms));
            keyTerms = keyTerms.sort(() => Math.random() - 0.5);
            matchHtml += '<ul style="list-style:none; padding:0;">';
            keyTerms.forEach(term => {
                matchHtml += `<li><input type="text" placeholder="Match for: ${term}"></li>`;
            });
            matchHtml += '</ul>';
        } else {
            matchHtml += '<p>No key terms found.</p>';
        }
        gameOutput.innerHTML = matchHtml;
        return;
    }
    // Quiz game (default)
    let quizHtml = '<h2>Quiz Game</h2><ol>';
    sentences.forEach((sentence, idx) => {
        quizHtml += `<li>What is the main idea of: <em>"${sentence}"</em>?<br>
        <input type="text" placeholder="Your answer here"></li>`;
        const words = sentence.split(' ');
        if (words.length > 4) {
            const randIdx = Math.floor(Math.random() * words.length);
            const blankSentence = words.map((w, i) => i === randIdx ? '_____' : w).join(' ');
            quizHtml += `<li>Fill in the blank: <em>"${blankSentence}"</em><br>
            <input type="text" placeholder="Missing word"></li>`;
        }
        if (words.length > 6) {
            quizHtml += `<li>Name a key term from: <em>"${sentence}"</em><br>
            <input type="text" placeholder="Key term"></li>`;
        }
    });
    quizHtml += '</ol>';
    gameOutput.innerHTML = quizHtml;
});
