export function Icon({iconName, style}){
    const icons = {
        draw: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Draw</title>
            <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
        </svg>,
        select: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Select</title>
            <path d="M13,17H17V13H19V17H23V19H19V23H17V19H13V17M11,17V19H9V17H11M7,17V19H5V17H7M19,9V11H17V9H19M19,5V7H17V5H19M15,5V7H13V5H15M11,5V7H9V5H11M7,5V7H5V5H7M7,13V15H5V13H7M7,9V11H5V9H7Z" />
        </svg>,
        erase: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Eraser</title>
            <path d="M16.24,3.56L21.19,8.5C21.97,9.29 21.97,10.55 21.19,11.34L12,20.53C10.44,22.09 7.91,22.09 6.34,20.53L2.81,17C2.03,16.21 2.03,14.95 2.81,14.16L13.41,3.56C14.2,2.78 15.46,2.78 16.24,3.56M4.22,15.58L7.76,19.11C8.54,19.9 9.8,19.9 10.59,19.11L14.12,15.58L9.17,10.63L4.22,15.58Z" />
        </svg>,
        undo: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Undo</title>
            <path d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z" />
        </svg>,
        redo: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Redo</title>
            <path d="M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z" />
        </svg>,
        delete: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Delete selection</title>
            <path d="M21 20C21 20.55 20.55 21 20 21H19V19H21V20M15 21V19H17V21H15M11 21V19H13V21H11M7 21V19H9V21H7M4 21C3.45 21 3 20.55 3 20V19H5V21H4M3 15H5V17H3V15M21 15V17H19V15H21M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8M3 11H5V13H3V11M21 11V13H19V11H21M3 7H5V9H3V7M21 7V9H19V7H21M4 3H5V5H3V4C3 3.45 3.45 3 4 3M20 3C20.55 3 21 3.45 21 4V5H19V3H20M15 5V3H17V5H15M11 5V3H13V5H11M7 5V3H9V5H7Z" />
        </svg>,
        rect: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Add rectangle</title>
            <path d="M4,6V19H20V6H4Z" />
        </svg>,
        circle: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Add circle</title>
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
        </svg>,
        plane: <div className={`${style && style} w-2 border-l-2 border-b-2 h-4`}>
            <title>Add coordinate system</title>
        </div>,
        edit: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>notebook-edit</title>
            <path d="M21.04 13.13C21.18 13.13 21.31 13.19 21.42 13.3L22.7 14.58C22.92 14.79 22.92 15.14 22.7 15.35L21.7 16.35L19.65 14.3L20.65 13.3C20.76 13.19 20.9 13.13 21.04 13.13M19.07 14.88L21.12 16.93L15.06 23H13V20.94L19.07 14.88M3 7V5H5V4C5 2.89 5.9 2 7 2H13V9L15.5 7.5L18 9V2H19C20.05 2 21 2.95 21 4V10L11 20V22H7C5.95 22 5 21.05 5 20V19H3V17H5V13H3V11H5V7H3M5 7H7V5H5V7M5 11V13H7V11H5M5 17V19H7V17H5Z" />
        </svg>,
        delete_notebook: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>notebook-remove</title>
            <path d="M3 7V5H5V4C5 2.9 5.9 2 7 2H13V9L15.5 7.5L18 9V2H19C20 2 21 3 21 4V13.8C20.1 13.3 19.1 13 18 13C14.7 13 12 15.7 12 19C12 20.1 12.3 21.1 12.8 22H7C5.9 22 5 21 5 20V19H3V17H5V13H3V11H5V7H3M5 5V7H7V5H5M5 19H7V17H5V19M5 13H7V11H5V13M20.1 15.5L18 17.6L15.9 15.5L14.5 16.9L16.6 19L14.5 21.1L15.9 22.5L18 20.4L20.1 22.5L21.5 21.1L19.4 19L21.5 16.9L20.1 15.5Z" />
        </svg>,
        three_dots: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>dots-horizontal</title>
            <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
        </svg>,
        add_notebook: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>notebook-plus</title>
            <path d="M3 7V5H5V4C5 2.9 5.9 2 7 2H13V9L15.5 7.5L18 9V2H19C20 2 21 3 21 4V13.8C20.1 13.3 19.1 13 18 13C14.7 13 12 15.7 12 19C12 20.1 12.3 21.1 12.8 22H7C5.9 22 5 21 5 20V19H3V17H5V13H3V11H5V7H3M5 5V7H7V5H5M5 19H7V17H5V19M5 13H7V11H5V13M17 15V18H14V20H17V23H19V20H22V18H19V15H17Z" />
        </svg>
    }
    return (
        <>
            <div className={`${style ? style : 'w-5 fill-black'}`}>
                {icons[iconName]}
            </div>
        </>
    )
}