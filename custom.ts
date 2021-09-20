namespace blockSettings {
    const NUM_BYTES = 1;
    const VALUE_SHIFT = 2;

    /**
     * Set named settings to a given array of numbers.
     * 
     * @param name   The name of the setting to set
     */
    //% blockId=block_settings_write_position_buffer
    //% block="set setting $key to position buffer $value"
    //% weight=60 blockGap=8 group="Arrays"
    export function writePositionBuffer(key: string, value: number[]) {
        const buf = control.createBuffer(value.length * NUM_BYTES);
        let offset = 0;
        const format = numFormat();


        for (const entry of value) {
            buf.setNumber(format, offset, entry >> VALUE_SHIFT);
            offset += NUM_BYTES;
        }

        settings.writeBuffer(key, buf);
    }

    /**
     * Read named setting as an array of numbers.
     * 
     * @param name   The name of the setting to read
     */
    //% blockId=block_settings_read_position_buffer
    //% block="read setting $key as position buffer"
    //% weight=50 group="Arrays"
    export function readPositionBuffer(key: string) {
        const buf = settings.readBuffer(key);
        const format = numFormat();
        let offset = 0;
        const res: number[] = [];

        while (offset < buf.length) {
            res.push(buf.getNumber(format, offset) << VALUE_SHIFT);
            offset += NUM_BYTES;
        }

        return res;
    }

    function numFormat() {
        let format: NumberFormat;
        switch (NUM_BYTES as number) {
            case 1:
                format = NumberFormat.UInt8LE;
                break;
            case 2:
                format = NumberFormat.UInt16LE;
                break;
            case 4:
                format = NumberFormat.UInt32LE;
                break;
        }
        return format;
    }
}
