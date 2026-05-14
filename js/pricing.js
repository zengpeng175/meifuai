/* Pricing page filter interaction */
document.addEventListener('DOMContentLoaded', () => {
    initPricingFilters();
});

function initPricingFilters() {
    const tabs = document.querySelectorAll('.filter-tab');
    const rows = document.querySelectorAll('#pricingBody tr');
    if (!tabs.length || !rows.length) return;

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;
            rows.forEach((row) => {
                if (filter === 'all' || row.dataset.provider === filter) {
                    row.classList.remove('hidden');
                } else {
                    row.classList.add('hidden');
                }
            });
        });
    });
}