import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';
import { Variables } from '../services/variable.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  passwords: string[] = [];

  constructor(
    private navCtrl: NavController,
    private variables: Variables,
  ) {}

  async ngOnInit() {
    await this.loadPasswords();
  }

  async loadPasswords() {
    const { value } = await Preferences.get({ key: 'passwords' });
    if (value) {
      this.passwords = JSON.parse(value);
    }
  }

  copyToClipboard(password: string) {
    navigator.clipboard.writeText(password);
    this.variables.gen_alert('Password Copied!!', 'You can get it from the clipboard');
  }

  async clearHistory() {
    this.variables.gen_alert(
      'Clear History?',
      "Warning! You're about to clear all your saved passwords. This cannot be undo. Continue?",
      [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            this.historyCleared();
          },
        },
      ]
    );
  }

  async historyCleared() {
    this.passwords = [];
    await Preferences.remove({ key: 'passwords' });
  }

  async deletePassword(index: number) {
    this.variables.gen_alert(
      'Delete Password?',
      "Are you sure you want to delete this password? This action cannot be undone.",
      [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            this.removePassword(index);
          },
        },
      ]
    );
  }
  
  async removePassword(index: number) {
    this.passwords.splice(index, 1);
    await Preferences.set({
      key: 'passwords',
      value: JSON.stringify(this.passwords),
    });
  }
  

}
