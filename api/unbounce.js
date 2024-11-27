<script>
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#lp-pom-form-167');
  	const formButton = document.querySelector('#lp-pom-form-167 form button');
    const submitButton = document.querySelector('#lp-pom-button-532');
    let isSubmitting = false;

    if (!form) {
        console.error('Form not found! Please check the form selector.');
        return;
    }

    if (!submitButton) {
        console.error('Submit button not found! Please check the button selector.');
        return;
    }

    async function handleButtonClick(e) {
        if (isSubmitting) {
            console.log('Form is already being submitted. Please wait.');
            return;
        }

        e.preventDefault();
        e.stopPropagation();
        console.log('Button click intercepted.');

        const vatInput = form.querySelector('input[name="btw_nummer"]');
        if (!vatInput) {
            console.error('VAT input field not found!');
            alert('VAT input field is missing. Please contact support.');
            return;
        }

        let vatNumber = vatInput.value.trim();
        console.log(`Original VAT Number: ${vatNumber}`);

        let cleanedVAT = vatNumber.replace(/[A-Za-z.\s]/g, '');
        console.log(`Cleaned VAT Number: ${cleanedVAT}`);

        if (!/^\d+$/.test(cleanedVAT)) {
            alert('Voer een geldig btw-nummer in dat alleen cijfers bevat.');
            return;
        }

        const data = {
            countryCode: "BE",
            vatNumber: cleanedVAT
        };

        console.log('Sending VAT validation request:', data);

        try {
            isSubmitting = true;

            submitButton.disabled = true;
            submitButton.textContent = 'Validating...';
            console.log('Submit button disabled and text changed to "Validating...".');

            const response = await fetch('https://serverless-vat-validation.vercel.app/api/check-vat-number', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            console.log('Received response:', response);

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }

            const responseData = await response.json();
            console.log('Validation result:', responseData);

            if (responseData.valid) {
                console.log('VAT is valid. Proceeding to submit the form.');

                // Trigger the form's submit event
                form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
              	formButton.click();
                console.log('Form submitted successfully.');
            } else {
                alert('Het door u ingevoerde btw-nummer is niet geldig. Controleer het en probeer het opnieuw.');
                console.log('Invalid VAT number. Form submission halted.');
            }
        } catch (error) {
            console.error('Error validating VAT number:', error);
            alert('There was an error validating the VAT number. Please try again later.');
        } finally {
            isSubmitting = false;

            submitButton.disabled = false;
            submitButton.textContent = 'Ik wil meer info!';
            console.log('Submit button re-enabled and text reverted to "Submit".');
        }
    }

    submitButton.addEventListener('click', handleButtonClick);
});
</script>
