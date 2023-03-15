document.addEventListener('DOMContentLoaded', function () {
    const RADIO_GROUP1_SELECTOR = '[fs-hacks-element="panel-type"]';
    const RADIO_GROUP2_SELECTOR = '[fs-hacks-element="panel-amount"]';
    const TOTAL_SELECTOR = '[fs-hacks-element="total-value"]';
    const TOTAL_SELECTOR_BANNER = '[fs-hacks-element="total-value-banner"]';
    const BATTERY_VALUE = '[fs-hacks-element="battery-selector"]';
    const HIDDEN_INPUT_SELECTOR = '[fs-hacks-element="hidden-total"]';
    const radiosGroup1 = document.querySelectorAll(RADIO_GROUP1_SELECTOR);
    const radiosGroup2 = document.querySelectorAll(RADIO_GROUP2_SELECTOR);
    const totalValueBanner = document.querySelector(TOTAL_SELECTOR_BANNER);
    const totalValueDiv = document.querySelector(TOTAL_SELECTOR);
    const batteryValue = document.querySelector(BATTERY_VALUE);
    const hiddenTotalInput = document.querySelector(HIDDEN_INPUT_SELECTOR);
  
    if ((radiosGroup1.length === 0 && radiosGroup2.length === 0) || !totalValueDiv || !hiddenTotalInput) return;
  
    const updateTotals = (sum, sum2, sum3, totalValueDiv, totalValueBanner, hiddenTotalInput) => {
          
      const combined = sum + sum2 + sum3;
      const formattedSum = new Intl.NumberFormat().format(combined);

      totalValueDiv.innerText = formattedSum;
      totalValueBanner.innerText = formattedSum;
      hiddenTotalInput.value = formattedSum;
    };
  
    let sum = 5734;
    let sum2 = 0;
    let sum3 = 0;
  
    for (const radio of radiosGroup1) {
      const amountToBeAdded = Number(radio.getAttribute('add-value'));
  
      if (isNaN(amountToBeAdded)) continue;
      if (radio.checked) sum += amountToBeAdded;
  
      radio.addEventListener('change', function () {
        if (radio.checked) {
          sum = amountToBeAdded;
          for (const otherRadio of radiosGroup1) {
            if (otherRadio !== radio) {
              otherRadio.checked = false;
            }
          }
        }
  
        updateTotals(sum, sum2, sum3, totalValueDiv, totalValueBanner, hiddenTotalInput);
      });
    }
  
    for (const radio of radiosGroup2) {
      const amountToBeAdded2 = Number(radio.getAttribute('add-value'));
  
      if (isNaN(amountToBeAdded2)) {
        amountToBeAdded2 = 0;
      };
      if (radio.checked) sum2 += amountToBeAdded2;
  
      radio.addEventListener('change', function () {
        if (radio.checked) {
          sum2 = amountToBeAdded2;
          for (const otherRadio2 of radiosGroup2) {
            if (otherRadio2 !== radio) {
              otherRadio2.checked = false;
            }
          }
        }
  
        updateTotals(sum, sum2, sum3, totalValueDiv, totalValueBanner, hiddenTotalInput);
      });
    }

    if (batteryValue) {
        const amountToBeAdded3 = Number(batteryValue.getAttribute('add-value'));

        if (!isNaN(amountToBeAdded3)) {
            batteryValue.addEventListener('change', function () {
                sum3 = batteryValue.checked ? amountToBeAdded3 : 0;

                updateTotals(sum, sum2, sum3, totalValueDiv, totalValueBanner, hiddenTotalInput);
            });
        }
    }


  
    updateTotals(sum, sum2, sum3, totalValueDiv, totalValueBanner, hiddenTotalInput);
  });
  