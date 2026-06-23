import { Redirect } from 'expo-router';

export default function Index() {
  // Phase 4 Dashboard will be here. Redirecting to Vehicles for now to test Phase 3.
  return <Redirect href="/vehicles" />;
}
