# App Icons

This directory contains the PWA app icons.

## Required Icons

- `icon-192x192.png` - 192x192px app icon
- `icon-512x512.png` - 512x512px app icon

## Generating Icons

You can generate PNG icons from the `icon.svg` file using:

### Using ImageMagick
```bash
convert -background none -resize 192x192 icon.svg icon-192x192.png
convert -background none -resize 512x512 icon.svg icon-512x512.png
```

### Using Inkscape
```bash
inkscape icon.svg --export-filename=icon-192x192.png --export-width=192 --export-height=192
inkscape icon.svg --export-filename=icon-512x512.png --export-width=512 --export-height=512
```

### Online Tools
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator

## Placeholder Icons

For development, you can use the SVG file directly or create simple placeholder PNGs.
The icon design features a circular target/tip jar symbol on a blue background.
