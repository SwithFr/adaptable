export default class Adaptable {

    private adaptableElements: HTMLElement[]

    private readonly selector: string

    constructor() {
        this.selector = '[data-adaptable]';
        this.adaptableElements = this.getAllAdaptableElements();
    }

    /**
     * Returns element current width
     */
    private static getWidth(ae: HTMLElement): number {
        return ae.getBoundingClientRect().width;
    }

    /**
     * Remove all ae-class
     */
    private static clearClasses(ae: HTMLElement): void {
        ae.className = ae.className.replace(/ae-\d+\s?(?!\w+)/gm, '');
    }

    /**
     * Remove all ae-class
     */
    private static addClass(ae: HTMLElement, breakpoint: number): void {
        ae.classList.add('ae-' + breakpoint);
    }

    /**
     * Does element already has class for breakpoint
     */
    private static hasClassForBreakpoint(ae: HTMLElement, breakpoint: number): boolean {
        return ae.classList.contains('ae-' + breakpoint);
    }

    observe(): void {
        window.addEventListener('resize', () => {
            this.adapt();
        });
    }

    /**
     * Add ae-class to elements based on their current width
     */
    adapt(): void {
        this.getAllAdaptableElements();

        if (this.adaptableElements.length) {
            this.adaptableElements.forEach((ae) => {
                this.addClassIfNeeded(ae);
            });
        }
    }

    /**
     * Get all adaptable elements on page
     */
    private getAllAdaptableElements(): HTMLElement[] {
        return Array.from(document.querySelectorAll(this.selector));
    }

    /**
     * Returns all breakpoints for this element
     */
    private getBreakpoints(ae: HTMLElement): number[] {
        return ae.dataset.adaptable.split('-').map(bp => {
            return parseInt(bp, 10);
        }).sort().reverse();
    }

    /**
     * Add or remove ae-class on element based on his current width
     */
    private addClassIfNeeded(ae: HTMLElement): void {
        const breakpoints = this.getBreakpoints(ae);
        const width = Adaptable.getWidth(ae);

        if (width > breakpoints[0]) {
            Adaptable.clearClasses(ae);
            return;
        }

        for (let i = 0; i < breakpoints.length; i++) {
            const w = breakpoints[i];

            if (width <= w) {
                Adaptable.addClass(ae, w);
            } else {
                Adaptable.removeClasses(ae, w);
            }
        }
    }

    /**
     * Remove unnecessary ae-class
     */
    private static removeClasses(ae: HTMLElement, breakpoint: number): void {
        ae.classList.remove('ae-' + breakpoint);
    }
}