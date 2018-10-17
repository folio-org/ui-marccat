import React from 'react';

export class SettingsPage<K> {
    route: string;
    label: string;
    component: React.ComponentType<K>
}
export class Settings<K> {
  pages: Array<SettingsPage<K>>;
}
