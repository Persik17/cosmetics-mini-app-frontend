import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cosmetics-mini-app-frontend';
  cosmeticName: string = '';
  cosmeticOpeningDate: string = '';
  cosmeticExpirationDate: string = '';
  cosmetics: any[] = [];
  isModalOpen: boolean = false;
  currentMonth: Date = new Date();
  days: { day: number; hasExpiration: boolean; isExpired: boolean }[] = [];
  
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.loadCosmetics();
    if (isPlatformBrowser(this.platformId)) {
      this.initTelegramWebApp();
      console.log(this.telegram?.WebApp.initDataUnsafe?.user);
    }
    this.generateCalendar();
  }

  //Telegram Web App
  telegram: any;

  initTelegramWebApp() {
    if (this.telegram) {
      this.telegram.WebApp.ready();
    }
  }

  addCosmetic() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.cosmeticName && this.cosmeticOpeningDate && this.cosmeticExpirationDate) {
        const cosmeticData = {
          name: this.cosmeticName,
          openingDate: new Date(this.cosmeticOpeningDate).toISOString(),
          expirationDate: new Date(this.cosmeticExpirationDate).toISOString()
        };

        // Simulate API call
        this.simulateSaveCosmetic(cosmeticData);
      } else {
        alert("Please fill in all fields.");
      }
    }
  }

  loadCosmetics() {
    // Use mock data
    this.cosmetics = [
      { name: "Lipstick", openingDate: "2024-01-15T00:00:00", expirationDate: "2024-12-31T00:00:00" },
      { name: "Mascara", openingDate: "2023-11-20T00:00:00", expirationDate: "2024-06-30T00:00:00" },
      { name: "Foundation", openingDate: "2024-02-01T00:00:00", expirationDate: "2025-01-31T00:00:00" }
    ];

    this.generateCalendar();
  }

  // Simulate saving data
  simulateSaveCosmetic(cosmeticData: any) {
    // Add the cosmetic data to the local cosmetics array
    this.cosmetics.push({
      name: cosmeticData.name,
      openingDate: cosmeticData.openingDate,
      expirationDate: cosmeticData.expirationDate
    });

    // Clear form and close modal
    this.cosmeticName = '';
    this.cosmeticOpeningDate = '';
    this.cosmeticExpirationDate = '';
    this.closeModal();
    this.generateCalendar();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.cosmeticName = '';
    this.cosmeticOpeningDate = '';
    this.cosmeticExpirationDate = '';
  }

  // Calendar Methods
  generateCalendar() {
    this.days = [];
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(1 - firstDay.getDay());

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const day = date.getDate();
      const hasExpiration = this.hasExpirationForDay(date);
      const isExpired = this.isExpiredForDay(date);

      this.days.push({ day, hasExpiration, isExpired });
    }
  }

  changeMonth(step: number) {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + step, 1);
    this.generateCalendar();
  }

  hasExpirationForDay(date: Date): boolean {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return this.cosmetics.some(cosmetic => {
      if (cosmetic.expirationDate) {
        const expirationDate = new Date(cosmetic.expirationDate);
        return expirationDate.getFullYear() === year &&
          expirationDate.getMonth() === month &&
          expirationDate.getDate() === day;
      }
      return false;
    });
  }

  isExpiredForDay(date: Date): boolean {
    if (!this.cosmetics) {
      return false;
    }

    const today = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return this.cosmetics.some(cosmetic => {
      if (cosmetic.expirationDate) {
        const expirationDate = new Date(cosmetic.expirationDate);
        return expirationDate <= date && expirationDate.getFullYear() === year &&
          expirationDate.getMonth() === month &&
          expirationDate.getDate() === day;
      }
      return false;
    });
  }
}