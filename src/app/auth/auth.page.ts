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
        // Perform biometric authentication if available
        await NativeBiometric.verifyIdentity({
          reason: 'Please authenticate to continue',
          title: 'Authentication Required',
          subtitle: 'Log in using your credentials',
          useFallback: true, // This will use device credentials if biometric fails
        });

        // Authentication successful
        this.navCtrl.navigateForward('/tabs');
      } else {
        // Biometric not available, fallback to device credentials
        await NativeBiometric.verifyIdentity({
          reason: 'Please authenticate to continue',
          title: 'Authentication Required',
          subtitle: 'Log in using your credentials',
          useFallback: true, // This will trigger the device's lock screen (pattern/PIN/password)
        });

        // Fallback authentication successful
        this.navCtrl.navigateForward('/tabs');
      }
    } catch (error) {
      // Authentication failed or an error occurred
      this.variable.gen_alert('Error!!', 'Authentication failed');
    }
  }
}
