import pygame
import random
import time

# Definir constantes
WIDTH = 800
HEIGHT = 600
FPS = 30
CARD_SIZE = 100
CARD_SPACING = 20
CARD_ROWS = 3
CARD_COLS = 4
CARD_AREA_WIDTH = CARD_COLS * CARD_SIZE + (CARD_COLS - 1) * CARD_SPACING
CARD_AREA_HEIGHT = CARD_ROWS * CARD_SIZE + (CARD_ROWS - 1) * CARD_SPACING
CARD_AREA_X = (WIDTH - CARD_AREA_WIDTH) // 2
CARD_AREA_Y = (HEIGHT - CARD_AREA_HEIGHT) // 2

# Definir colores
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GRAY = (128, 128, 128)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
CARD_COLORS = [(255, 0, 0), (0, 255, 0), (0, 0, 255), (255, 255, 0), (255, 0, 255), (0, 255, 255)]

# Inicializar Pygame
pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Juego de Memoria")
clock = pygame.time.Clock()

# Cargar imágenes de cartas
card_images = []
for color in CARD_COLORS:
    image = pygame.Surface((CARD_SIZE, CARD_SIZE))
    image.fill(color)
    card_images.append(image)

# Crear cartas
cards = []
for i in range(len(CARD_COLORS)):
    cards.append((card_images[i], CARD_COLORS[i]))
    cards.append((card_images[i], CARD_COLORS[i]))

# Mezclar las cartas
random.shuffle(cards)

# Crear rectángulos de cartas
card_rects = []
for row in range(CARD_ROWS):
    for col in range(CARD_COLS):
        x = CARD_AREA_X + col * (CARD_SIZE + CARD_SPACING)
        y = CARD_AREA_Y + row * (CARD_SIZE + CARD_SPACING)
        rect = pygame.Rect(x, y, CARD_SIZE, CARD_SIZE)
        card_rects.append(rect)

# Crear variables del juego
selected_cards = []
matched_cards = []
score = 0

# Definir funciones de ayuda
def draw_card_backs():
    for rect in card_rects:
        pygame.draw.rect(screen, WHITE, rect)

def draw_card_fronts():
    for i, rect in enumerate(card_rects):
        if i in matched_cards:
            continue
        if i in selected_cards:
            index = cards[i][1]
            image = cards[i][0]
            pygame.draw.rect(screen, index, rect)
            screen.blit(image, rect)
        else:
            pygame.draw.rect(screen, BLUE, rect)

def check_for_match():
    if len(selected_cards) == 2:
        card1_index = selected_cards[0]
        card2_index = selected_cards[1]
        if cards[card1_index][1] == cards[card2_index][1]:
            matched_cards.append(card1_index)
            matched_cards.append(card2_index)
            increase_score()
        selected_cards.clear()

def increase_score():
    global score
    score += 1

def draw_score():
    font = pygame.font.Font(None, 36)
    score_text = font.render(f"Puntaje: {score}", True, WHITE)
    screen.blit(score_text, (10, 10))

def reset_game():
    global selected_cards
    global matched_cards
    global score
    selected_cards = []
    matched_cards = []
    score = 0
    random.shuffle(cards)

# Bucle del juego
running = True
while running:
    # Manejar eventos
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.MOUSEBUTTONDOWN:
            if len(selected_cards) < 2:
                for i, rect in enumerate(card_rects):
                    if rect.collidepoint(event.pos) and i not in matched_cards and i not in selected_cards:
                        selected_cards.append(i)
                        break

    # Actualizar estado del juego
    check_for_match()

    # Dibujar pantalla
    screen.fill(BLACK)
    draw_card_backs()
    draw_card_fronts()
    draw_score()
    pygame.display.flip()

    # Verificar si se encontraron todas las parejas
    if len(matched_cards) == len(cards):
        reset_game()

    # Esperar al siguiente cuadro
    clock.tick(FPS)

# Limpiar