declare const _default: {
    setLevel(level: string): void;
    useLocalConfig(): void;
    info(message: string, ...meta: any[]): void;
    error(message: string, ...meta: any[]): void;
    warn(message: string, ...meta: any[]): void;
    debug(message: string, ...meta: any[]): void;
    log(message: string, level?: string, ...meta: any[]): void;
    _getDefaultMeta(): {
        timestamp: string;
        service: string;
    };
};

export { _default as default };
