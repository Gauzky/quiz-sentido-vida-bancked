document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submit-btn');
    const quizForm = document.getElementById('quiz-form');
    const successMessage = document.getElementById('success-message');

    submitBtn.addEventListener('click', async function() {
        // Validar campos obrigatórios
        const nome = document.getElementById('nome').value.trim();
        const curso = document.getElementById('curso').value;

        if (!nome) {
            alert('Por favor, preencha seu nome.');
            document.getElementById('nome').focus();
            return;
        }

        if (!curso) {
            alert('Por favor, selecione seu curso.');
            document.getElementById('curso').focus();
            return;
        }

        // Validar perguntas de múltipla escolha (1-5)
        for (let i = 1; i <= 5; i++) {
            const selected = document.querySelector(`input[name="q${i}"]:checked`);
            if (!selected) {
                alert(`Por favor, responda a pergunta ${i}.`);
                return;
            }
        }

        // Validar perguntas verdadeiro/falso (6-10)
        for (let i = 6; i <= 10; i++) {
            const selected = document.querySelector(`input[name="q${i}"]:checked`);
            if (!selected) {
                alert(`Por favor, responda a pergunta ${i}.`);
                return;
            }
        }

        // Validar perguntas abertas (11-14)
        for (let i = 11; i <= 14; i++) {
            const textarea = document.querySelector(`textarea[name="q${i}"]`);
            if (!textarea.value.trim()) {
                alert(`Por favor, responda a pergunta ${i}.`);
                textarea.focus();
                return;
            }
        }

        // Coletar todas as respostas
        const formData = {
            nome: nome,
            curso: curso,
            q1: document.querySelector('input[name="q1"]:checked').value,
            q2: document.querySelector('input[name="q2"]:checked').value,
            q3: document.querySelector('input[name="q3"]:checked').value,
            q4: document.querySelector('input[name="q4"]:checked').value,
            q5: document.querySelector('input[name="q5"]:checked').value,
            q6: document.querySelector('input[name="q6"]:checked').value,
            q7: document.querySelector('input[name="q7"]:checked').value,
            q8: document.querySelector('input[name="q8"]:checked').value,
            q9: document.querySelector('input[name="q9"]:checked').value,
            q10: document.querySelector('input[name="q10"]:checked').value,
            q11: document.querySelector('textarea[name="q11"]').value.trim(),
            q12: document.querySelector('textarea[name="q12"]').value.trim(),
            q13: document.querySelector('textarea[name="q13"]').value.trim(),
            q14: document.querySelector('textarea[name="q14"]').value.trim()
        };

        // Enviar para a API
        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            const response = await fetch('/api/quiz/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                // Esconder o formulário e mostrar mensagem de sucesso
                quizForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Scroll suave para o topo
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                alert('Erro ao enviar o quiz: ' + (result.error || 'Erro desconhecido'));
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Respostas';
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao enviar o quiz. Por favor, tente novamente.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Respostas';
        }
    });

    // Adicionar animação suave ao scroll entre seções
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
    });

    // Observador de interseção para animações
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});

