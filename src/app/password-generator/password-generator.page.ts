import { Component } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.page.html',
  styleUrls: ['./password-generator.page.scss'],
})
export class PasswordGeneratorPage {
  strength: string = 'medium';
  length: number = 12;
  password: string = '';
  passwords: string[] = [];

  constructor(private navCtrl: NavController) {}

  async ngOnInit() {
    await this.loadPasswords();
  }

  generatePassword() {
    const weakChars = 'abcdefghijklmnopqrstuvwxyz';
    const mediumChars = weakChars + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const strongChars = mediumChars + '!@#$%^&*()_+{}[]';

    let charset = mediumChars;

    if (this.strength === 'weak') charset = weakChars;
    if (this.strength === 'strong') charset = strongChars;

    this.password = Array(this.length)
      .fill('')
      .map(() => charset[Math.floor(Math.random() * charset.length)])
      .join('');
  }

  async acceptPassword() {
    // Add the password to the passwords array
    this.passwords.push(this.password);

    // Save the passwords to Preferences
    await Preferences.set({
      key: 'passwords',
      value: JSON.stringify(this.passwords),
    });

    // Navigate to the history page
    this.navCtrl.navigateForward('/tabs/history');
  }

  async loadPasswords() {
    // Load passwords from Preferences
    const { value } = await Preferences.get({ key: 'passwords' });
    if (value) {
      this.passwords = JSON.parse(value);
    }
  }

}
