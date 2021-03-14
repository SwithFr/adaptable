export default class Adaptable {

    private adaptableElements: HTMLElement[]

    private selector: string

    constructor() {
        this.selector = '[data-adaptable]';
        this.adaptableElements = this.getAllAdaptableElements();
        this.adapt();

        window.addEventListener('resize', () => {
            this.getAllAdaptableElements();
            this.adapt();
        });
    }

    /**
     * Get all adaptable elements on page
     */
    getAllAdaptableElements():  HTMLElement[] {
        return Array.from(document.querySelectorAll(this.selector));
    }

    /**
     * Add ae-class to elements based on their current width
     */
    adapt(): void {
        if (this.adaptableElements.length) {
            this.adaptableElements.forEach((ae) => {
                this.addClassIfNeeded(ae);
            });
        }
    }

    /**
     * Returns all breakpoints for this element
     */
    getBreakpoints(ae: HTMLElement): number[] {
        return ae.dataset.adaptable.split('-').map(bp => {
            return parseInt(bp, 10);
        }).sort().reverse();
    }

    /**
     * Returns element current width
     */
    getWidth(ae: HTMLElement): number {
        return ae.getBoundingClientRect().width;
    }

    /**
     * Add or remove ae-class on element based on his current width
     */
    addClassIfNeeded(ae: HTMLElement): void {
        const breakpoints = this.getBreakpoints(ae);
        const width = this.getWidth(ae);

        if (width > breakpoints[0]) {
            this.clearClasses(ae);
            return;
        }

        for (let i = 0; i < breakpoints.length; i++) {
            const w = breakpoints[i];
            const w1 = breakpoints.hasOwnProperty(i+1) ? breakpoints[i+1] : 0;

            if (width <= w && width > w1 && !this.hasClassForBreakpoint(ae, w)) {
                this.clearClasses(ae);
                this.addClass(ae, w);
            }
        }
    }

    /**
     * Remove all ae-class
     */
    clearClasses(ae: HTMLElement): void {
        ae.className = ae.className.replace(/ae-\d+\s?(?!\w+)/gm, '');
    }

    /**
     * Remove all ae-class
     */
    addClass(ae: HTMLElement, breakpoint: number): void {
        ae.classList.add('ae-'+breakpoint);
    }

    /**
     * Does element already has class for breakpoint
     */
    hasClassForBreakpoint(ae: HTMLElement, breakpoint: number): boolean {
        return ae.classList.contains('ae-'+breakpoint);
    }

}