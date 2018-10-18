package com.moodtracker;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MoodTracker";
    }

    public static class AlarmActivityDelegate extends ReactActivityDelegate {
        public static final String INITIAL_PAGE_ARG = "initialPage";
        private Bundle mInitialProps = null;
        private final @Nullable
        Activity mActivity;

        public AlarmActivityDelegate(Activity activity, String mainComponentName) {
            super(activity, mainComponentName);
            this.mActivity = activity;
        }

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            // bundle is where we put our alarmID with launchIntent.putExtra
            Bundle bundle = mActivity.getIntent().getExtras();
            if (bundle != null && bundle.containsKey(INITIAL_PAGE_ARG)) {

            }
            super.onCreate(savedInstanceState);
        }

        @Override
        protected Bundle getLaunchOptions() {
            mInitialProps = new Bundle();
            // put any initialProps here
            mInitialProps.putString(INITIAL_PAGE_ARG, "foooo");
            return mInitialProps;
        }
    };

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return super.createReactActivityDelegate();
    }
}
