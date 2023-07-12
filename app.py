from PIL import Image

hidden_text = """----PIXEL START----function init(){ alert(`You don't even know where this script is executed`) }; init()----PIXEL END----"""

input_image = Image.open("./img/buyback-source.png").convert(mode="RGB")

pixel_map = input_image.load()

width, height = input_image.size

text_pointer = 0
end_text_pointer = len(hidden_text)

for i in range(height):
    for j in range(width):
        r,g,b = input_image.getpixel((i,j))
        if text_pointer < end_text_pointer:
                input_image.putpixel((j,i), (50,ord(hidden_text[text_pointer]),50))
                text_pointer += 1
        else:
             pixel_map[i,j] = (int(r), int(g), int(b))

input_image.save("./img/buyback.png")


input_image = Image.open("./img/buyback.png")

pixel_map = input_image.load()

width, height = input_image.size

pixelStrings = ""

for i in range(height):
    for j in range (width):
              if len(pixelStrings) == len(hidden_text):
                    break
              r,g,b = input_image.getpixel((j,i))
              pixelStrings += chr(g)
              

print(pixelStrings)