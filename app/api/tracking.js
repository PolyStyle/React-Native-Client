'use strict';
import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from 'react-native-google-analytics-bridge';

const tracker = new GoogleAnalyticsTracker('UA-93128312-1');

function trackScreenView(screenName) {
  console.log('TRACKING ', screenName)
  tracker.trackScreenView(screenName);
}
exports.trackScreenView = trackScreenView;


