for file in ../_posts/*; do
  filename=$(echo "$file" | cut -c14-65)
  thedate=$(echo "$file" | cut -c3-12)
  echo "$filename"",""$thedate"
done
