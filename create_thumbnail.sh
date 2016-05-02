convert "$1" -crop 1024x768+0+0 "$1" && convert "$1" -filter Lanczos -thumbnail 200x150 "$1_thumbnail.png"
echo "$1_thumbnail.png"