declare const _default: {
    setLevel(level: string): void;
    useLocalConfig(): void;
    info(message: string, meta?: {}): void;
    error(error: string | Error, meta?: {}): void;
    warn(message: string, meta?: {}): void;
    debug(message: string, meta?: {}): void;
    log(message: string, level?: string, meta?: {}): void;
    _getDefaultMeta(): {
        timestamp: string;
        service: string;
    };
};

export { _default as default };
