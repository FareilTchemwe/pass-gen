import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NativeBiometric } from 'capacitor-native-biometric';
import { Variables } from '../services/variable.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  constructor(
    private navCtrl: NavController,
    private variable: Variables,
  ) {}

  async ngOnInit() {
    this.authenticate();
  }

  async authenticate() {
    try {
      const available = await NativeBiometric.isAvailable();

      if (available.isAvailable) {
        // Perform the biometric authentication
        await NativeBiometric.verifyIdentity({
          reason: 'Please authenticate to continue',
          title: 'Biometric Authentication',
          subtitle: 'Log in using your biometric credentials',
        });

        // Authentication successful
        this.navCtrl.navigateForward('/tabs');
      } else {
        this.variable.gen_alert('Not Available!!','Biometric authentication is not available on this device');
      }
    } catch (error) {
      // Authentication failed or an error occurred
      this.variable.gen_alert('Error!!','Authentication failed');
    }
  }
}
