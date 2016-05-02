convert "$1" -crop 1024x768+0+0 "$1_crop" && convert "$1_crop" -filter Lanczos -thumbnail 200x150 "$1_thumbnail.png"
rm -rf "$1_crop"
echo "$1_thumbnail.png"