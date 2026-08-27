import { Engine } from '../core/Engine';

export type DockSide = 'left' | 'right';

export class SidebarToolcard {
  public element: HTMLElement;
  public title: string;
  public iconLabel: string;
  public isDetached: boolean = false;
  public isExpanded: boolean = true;
  private detachedX: number = 100;
  private detachedY: number = 100;
  private isDragging: boolean = false;
  private dragOffsetX: number = 0;
  private dragOffsetY: number = 0;

  public onDetach?: () => void;
  public onRedock?: () => void;

  private header: HTMLElement;
  private contentContainer: HTMLElement;
  private contentElement: HTMLElement;
  private collapseBtn: HTMLButtonElement;

  constructor(title: string, iconLabel: string, contentElement: HTMLElement) {
    this.title = title;
    this.iconLabel = iconLabel;
    this.contentElement = contentElement;
    this.element = document.createElement('div');
    this.element.className = 'sidebar-toolcard';
    this.header = document.createElement('div');
    this.contentContainer = document.createElement('div');
    this.collapseBtn = document.createElement('button');
    this.render();
    this.bindDragEvents();
  }

  public detach(x?: number, y?: number): void {
    this.isDetached = true;
    this.element.classList.add('toolcard-detached');
    if (x !== undefined) this.detachedX = x;
    if (y !== undefined) this.detachedY = y;
    this.element.style.position = 'fixed';
    this.element.style.left = `${this.detachedX}px`;
    this.element.style.top = `${this.detachedY}px`;
    this.element.style.transform = 'none';
    this.element.style.width = '300px';
    this.element.style.zIndex = '2000';
    document.body.appendChild(this.element);
    if (this.onDetach) this.onDetach();
  }

  public redock(): void {
    this.isDetached = false;
    this.element.classList.remove('toolcard-detached');
    this.element.style.position = '';
    this.element.style.left = '';
    this.element.style.top = '';
    this.element.style.width = '';
    this.element.style.zIndex = '';
    if (this.onRedock) this.onRedock();
  }

  public toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.contentContainer.style.display = 'block';
      this.collapseBtn.textContent = '[-]';
    } else {
      this.contentContainer.style.display = 'none';
      this.collapseBtn.textContent = '[+]';
    }
  }

  private render(): void {
    this.header.className = 'toolcard-header';
    this.header.style.display = 'flex';
    this.header.style.justifyContent = 'space-between';
    this.header.style.alignItems = 'center';
    this.header.style.padding = '8px 10px';
    this.header.style.backgroundColor = 'var(--pan)';
    this.header.style.borderBottom = '1px solid var(--bdr)';
    this.header.style.cursor = 'pointer';
    this.header.onclick = (e) => {
      if ((e.target as HTMLElement).tagName !== 'BUTTON') {
        this.toggleExpand();
      }
    };

    const titleSpan = document.createElement('span');
    titleSpan.textContent = this.title;
    titleSpan.style.fontWeight = 'bold';
    titleSpan.style.fontFamily = 'var(--font-mono, monospace)';
    titleSpan.style.fontSize = '11px';
    titleSpan.style.color = 'var(--ink)';

    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = '4px';

    this.collapseBtn.textContent = this.isExpanded ? '[-]' : '[+]';
    this.collapseBtn.title = 'Collapse / Expand';
    this.collapseBtn.style.cursor = 'pointer';
    this.collapseBtn.style.backgroundColor = 'var(--mut)';
    this.collapseBtn.style.border = '1px solid var(--bdr)';
    this.collapseBtn.style.color = 'var(--ink)';
    this.collapseBtn.style.padding = '2px 6px';
    this.collapseBtn.style.borderRadius = 'var(--radius-sm)';
    this.collapseBtn.style.fontWeight = 'bold';
    this.collapseBtn.onclick = (e) => {
      e.stopPropagation();
      this.toggleExpand();
    };

    const detachBtn = document.createElement('button');
    detachBtn.textContent = this.isDetached ? 'DOCK' : 'POP';
    detachBtn.title = this.isDetached ? 'Redock into sidebar' : 'Pop out as floating window';
    detachBtn.style.cursor = 'pointer';
    detachBtn.style.backgroundColor = 'var(--mut)';
    detachBtn.style.border = '1px solid var(--bdr)';
    detachBtn.style.color = 'var(--ink)';
    detachBtn.style.padding = '2px 6px';
    detachBtn.style.borderRadius = 'var(--radius-sm)';
    detachBtn.onclick = (e) => {
      e.stopPropagation();
      if (this.isDetached) {
        this.redock();
        detachBtn.textContent = 'POP';
      } else {
        const rect = this.element.getBoundingClientRect();
        this.detach(rect.left - 20, rect.top);
        detachBtn.textContent = 'DOCK';
      }
    };

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'X';
    closeBtn.title = 'Close Card';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.backgroundColor = 'transparent';
    closeBtn.style.border = '1px solid var(--bdr)';
    closeBtn.style.color = 'var(--mut)';
    closeBtn.style.padding = '2px 6px';
    closeBtn.style.borderRadius = 'var(--radius-sm)';
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      if (this.isDetached) {
        this.redock();
        detachBtn.textContent = 'POP';
      }
      this.element.style.display = 'none';
    };

    controls.appendChild(this.collapseBtn);
    controls.appendChild(detachBtn);
    controls.appendChild(closeBtn);

    this.header.appendChild(titleSpan);
    this.header.appendChild(controls);

    this.contentContainer.className = 'toolcard-content';
    this.contentContainer.style.padding = '8px';
    this.contentContainer.style.maxHeight = 'calc(100vh - 240px)';
    this.contentContainer.style.overflowY = 'auto';
    this.contentContainer.style.scrollbarWidth = 'thin';
    this.contentContainer.appendChild(this.contentElement);

    this.element.style.border = '1px solid var(--bdr)';
    this.element.style.borderRadius = 'var(--radius-sm)';
    this.element.style.backgroundColor = 'var(--bg)';
    this.element.style.marginBottom = '8px';
    this.element.style.display = 'flex';
    this.element.style.flexDirection = 'column';
    this.element.style.boxShadow = 'var(--shadow)';
    this.element.style.overflow = 'hidden';

    this.element.appendChild(this.header);
    this.element.appendChild(this.contentContainer);
  }

  private bindDragEvents(): void {
    const onMouseMove = (e: MouseEvent) => {
      if (!this.isDragging) return;
      this.detachedX = e.clientX - this.dragOffsetX;
      this.detachedY = e.clientY - this.dragOffsetY;
      this.element.style.left = `${this.detachedX}px`;
      this.element.style.top = `${this.detachedY}px`;
    };

    const onMouseUp = () => {
      this.isDragging = false;
      this.header.style.cursor = 'grab';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    this.header.addEventListener('mousedown', (e) => {
      if (!this.isDetached) return;
      this.isDragging = true;
      this.header.style.cursor = 'grabbing';
      this.dragOffsetX = e.clientX - this.detachedX;
      this.dragOffsetY = e.clientY - this.detachedY;
      
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
}

export class SidebarManager {
  public element: HTMLElement;
  public dockSide: DockSide = 'right';
  public scale: number = 0.85;
  public isCollapsed: boolean = false;
  private engine: Engine;
  private toolcards: SidebarToolcard[] = [];
  private scaleSlider: HTMLInputElement | null = null;
  private cardsContainer: HTMLElement;
  private controlsContainer: HTMLElement;

  constructor(engine: Engine) {
    this.engine = engine;
    this.element = document.createElement('div');
    this.element.id = 'sidebar-dock';
    this.cardsContainer = document.createElement('div');
    this.controlsContainer = document.createElement('div');
    this.injectStyles();
    this.render();
    this.mount();
    this.updateLayout();
  }

  private injectStyles(): void {
    if (document.getElementById('sidebar-styles')) return;
    const style = document.createElement('style');
    style.id = 'sidebar-styles';
    style.textContent = `
      #sidebar-dock {
        position: fixed;
        top: 56px;
        bottom: 56px;
        width: 300px;
        background-color: var(--pan-solid);
        border: 1px solid var(--bdr);
        border-radius: var(--radius);
        backdrop-filter: blur(20px);
        display: flex;
        flex-direction: column;
        transition: transform 0.2s ease, left 0.2s ease, right 0.2s ease, width 0.2s ease;
        z-index: 1000;
        box-shadow: var(--shadow);
        font-family: var(--font-mono, monospace);
        color: var(--ink);
      }
      
      #sidebar-dock.sidebar-right {
        right: 12px;
        left: auto;
        transform-origin: right center;
      }
      
      #sidebar-dock.sidebar-left {
        left: 12px;
        right: auto;
        transform-origin: left center;
      }
      
      body.left-handed #sidebar-dock.sidebar-right {
        right: auto;
        left: 12px;
        transform-origin: left center;
      }

      body.left-handed #sidebar-dock.sidebar-left {
        left: auto;
        right: 12px;
        transform-origin: right center;
      }

      #sidebar-dock.sidebar-collapsed {
        width: 60px;
      }
      
      .toolcard-detached {
        z-index: 2000;
        box-shadow: var(--shadow);
      }
    `;
    document.head.appendChild(style);
  }

  public addToolcard(card: SidebarToolcard): void {
    this.toolcards.push(card);
    card.onDetach = () => this.updateLayout();
    card.onRedock = () => {
      this.cardsContainer.appendChild(card.element);
      this.updateLayout();
    };
    this.cardsContainer.appendChild(card.element);
    this.updateLayout();
  }

  public toggleDockSide(): void {
    this.setDockSide(this.dockSide === 'right' ? 'left' : 'right');
  }

  public setDockSide(side: DockSide): void {
    this.dockSide = side;
    this.updateLayout();
  }

  public setCollapsed(collapsed: boolean): void {
    this.isCollapsed = collapsed;
    document.body.classList.toggle('sidebar-collapsed', collapsed);
    this.updateLayout();
  }

  public setVisible(visible: boolean): void {
    this.element.style.display = visible ? 'flex' : 'none';
    this.toolcards.forEach(card => {
      if (card.isDetached) {
        card.element.style.display = visible ? 'flex' : 'none';
      }
    });
  }

  public setScale(scale: number): void {
    this.scale = Math.max(0.7, Math.min(1.0, scale));
    if (this.scaleSlider) {
      this.scaleSlider.value = this.scale.toString();
    }
    this.updateLayout();
  }

  private render(): void {
    this.cardsContainer.style.flex = '1';
    this.cardsContainer.style.overflowY = 'auto';
    this.cardsContainer.style.padding = '8px';

    this.controlsContainer.style.padding = '8px';
    this.controlsContainer.style.borderTop = '1px solid var(--bdr)';
    this.controlsContainer.style.display = 'flex';
    this.controlsContainer.style.flexDirection = 'column';
    this.controlsContainer.style.gap = '8px';
    this.controlsContainer.style.backgroundColor = 'var(--pan)';
    this.controlsContainer.style.borderBottomLeftRadius = 'var(--radius)';
    this.controlsContainer.style.borderBottomRightRadius = 'var(--radius)';

    const topControls = document.createElement('div');
    topControls.style.display = 'flex';
    topControls.style.justifyContent = 'space-between';
    topControls.style.alignItems = 'center';

    const swapBtn = document.createElement('button');
    swapBtn.textContent = `DOCK: ${this.dockSide.toUpperCase()}`;
    swapBtn.title = 'Switch sidebar to opposite screen edge';
    swapBtn.style.cursor = 'pointer';
    swapBtn.style.backgroundColor = 'var(--mut)';
    swapBtn.style.border = '1px solid var(--bdr)';
    swapBtn.style.color = 'var(--ink)';
    swapBtn.style.padding = '4px 8px';
    swapBtn.style.borderRadius = 'var(--radius-sm)';
    swapBtn.style.fontSize = '10px';
    swapBtn.onclick = () => {
      this.toggleDockSide();
      swapBtn.textContent = `DOCK: ${this.dockSide.toUpperCase()}`;
    };

    const collapseBtn = document.createElement('button');
    collapseBtn.textContent = 'COLLAPSE';
    collapseBtn.title = 'Collapse sidebar to narrow icon strip';
    collapseBtn.style.cursor = 'pointer';
    collapseBtn.style.backgroundColor = 'var(--mut)';
    collapseBtn.style.border = '1px solid var(--bdr)';
    collapseBtn.style.color = 'var(--ink)';
    collapseBtn.style.padding = '4px 10px';
    collapseBtn.style.borderRadius = 'var(--radius-sm)';
    collapseBtn.style.fontWeight = 'bold';
    collapseBtn.style.fontSize = '10px';
    collapseBtn.onclick = () => this.setCollapsed(!this.isCollapsed);

    topControls.appendChild(swapBtn);
    topControls.appendChild(collapseBtn);

    const scaleControl = document.createElement('div');
    scaleControl.style.display = 'flex';
    scaleControl.style.alignItems = 'center';
    scaleControl.style.gap = '8px';

    const scaleLabel = document.createElement('span');
    scaleLabel.textContent = 'ZOOM';
    scaleLabel.style.fontSize = '11px';
    scaleLabel.style.fontWeight = 'bold';

    this.scaleSlider = document.createElement('input');
    this.scaleSlider.type = 'range';
    this.scaleSlider.min = '0.7';
    this.scaleSlider.max = '1.0';
    this.scaleSlider.step = '0.05';
    this.scaleSlider.value = this.scale.toString();
    this.scaleSlider.style.flex = '1';
    this.scaleSlider.oninput = (e) => {
      this.setScale(parseFloat((e.target as HTMLInputElement).value));
    };

    scaleControl.appendChild(scaleLabel);
    scaleControl.appendChild(this.scaleSlider);

    this.controlsContainer.appendChild(topControls);
    this.controlsContainer.appendChild(scaleControl);

    this.element.appendChild(this.cardsContainer);
    this.element.appendChild(this.controlsContainer);
  }

  private mount(): void {
    document.body.appendChild(this.element);
  }

  private updateLayout(): void {
    this.element.className = '';
    this.element.classList.add('sidebar-dock');
    this.element.classList.add(this.dockSide === 'left' ? 'sidebar-left' : 'sidebar-right');
    
    if (this.isCollapsed) {
      this.element.classList.add('sidebar-collapsed');
      this.controlsContainer.style.display = 'none';
      
      this.cardsContainer.innerHTML = '';
      
      // Top Expand Button
      const expandTopBtn = document.createElement('button');
      expandTopBtn.textContent = 'EXPAND';
      expandTopBtn.title = 'Expand full sidebar';
      expandTopBtn.style.width = '100%';
      expandTopBtn.style.padding = '8px 2px';
      expandTopBtn.style.marginBottom = '8px';
      expandTopBtn.style.cursor = 'pointer';
      expandTopBtn.style.backgroundColor = 'var(--active, var(--ink))';
      expandTopBtn.style.color = 'var(--active-fg, var(--bg))';
      expandTopBtn.style.border = '1px solid var(--bdr)';
      expandTopBtn.style.borderRadius = 'var(--radius-sm)';
      expandTopBtn.style.fontSize = '9px';
      expandTopBtn.style.fontWeight = 'bold';
      expandTopBtn.onclick = () => this.setCollapsed(false);
      this.cardsContainer.appendChild(expandTopBtn);

      this.toolcards.forEach(card => {
        if (!card.isDetached) {
          const iconBtn = document.createElement('div');
          iconBtn.title = `Click to open ${card.title}`;
          iconBtn.style.padding = '10px 4px';
          iconBtn.style.marginBottom = '6px';
          iconBtn.style.textAlign = 'center';
          iconBtn.style.cursor = 'pointer';
          iconBtn.style.backgroundColor = 'var(--pan)';
          iconBtn.style.border = '1px solid var(--bdr)';
          iconBtn.style.borderRadius = 'var(--radius-sm)';
          iconBtn.style.boxShadow = 'var(--shadow-sm)';
          iconBtn.innerHTML = `
            <div style="font-size: 11px; font-weight: 800; color: var(--ink);">${card.iconLabel}</div>
            <div style="font-size: 8px; color: var(--mut); margin-top: 2px;">${card.title.split(' ')[0]}</div>
          `;
          iconBtn.onmouseenter = () => {
            iconBtn.style.backgroundColor = 'var(--pan-hover)';
          };
          iconBtn.onmouseleave = () => {
            iconBtn.style.backgroundColor = 'var(--pan)';
          };
          iconBtn.onclick = () => {
            this.setCollapsed(false);
            card.element.style.display = 'flex';
            if (!card.isExpanded) card.toggleExpand();
            card.element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          };
          this.cardsContainer.appendChild(iconBtn);
        }
      });
    } else {
      this.controlsContainer.style.display = 'flex';
      this.cardsContainer.innerHTML = '';
      this.toolcards.forEach(card => {
        if (!card.isDetached) {
          card.element.style.display = 'flex';
          this.cardsContainer.appendChild(card.element);
        }
      });
    }

    this.element.style.transform = `scale(${this.scale})`;
  }
}
