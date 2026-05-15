document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = form.querySelectorAll('.form-control');
      
      inputs.forEach(input => {
        // Reset error state
        input.classList.remove('error');
        
        if (input.hasAttribute('required') && !input.value.trim()) {
          isValid = false;
          input.classList.add('error');
        }

        if (input.type === 'email' && input.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value.trim())) {
            isValid = false;
            input.classList.add('error');
          }
        }
      });

      // Special check for password match (register form)
      const pass = form.querySelector('input[name="password"]');
      const confirmPass = form.querySelector('input[name="confirm_password"]');
      if (pass && confirmPass) {
        if (pass.value !== confirmPass.value || pass.value.length < 8) {
          isValid = false;
          pass.classList.add('error');
          confirmPass.classList.add('error');
        }
      }

      // Special check for terms checkbox
      const terms = form.querySelector('input[name="terms"]');
      if (terms && !terms.checked) {
        isValid = false;
        alert('You must accept the Terms & Conditions.');
      }

      if (isValid) {
        // Show success inline
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="ph ph-check-circle"></i> Success!';
        btn.style.backgroundColor = '#10B981'; // green
        btn.style.borderColor = '#10B981';
        
        setTimeout(() => {
          form.reset();
          btn.innerHTML = originalText;
          btn.style.backgroundColor = '';
          btn.style.borderColor = '';
        }, 3000);
      }
    });
  });
});
