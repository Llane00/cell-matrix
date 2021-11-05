import { viewHeight, viewWidth } from '../configs'

type objectType = {
  x: number,
  y: number,
  width: number,
  height: number,
  centerX?: number,
  centerY?: number,
  halfWidth?: number,
  halfHeight?: number,
  speed?: number
}

// 是否超出屏幕了
export const isBeyoundScreen = (obj:objectType) => {
  // obj.x, obj.y
  // obj.x + obj.width, obj.y
  // obj.x, obj.y + obj.height
  // obj.x + obj.width, obj.y + obj.height
  return (obj.y + obj.height < 0 ||
    obj.y > viewHeight ||
    obj.x > viewWidth ||
    obj.x + obj.width < 0)
}

export const isTouchLeftScreenBorder = (obj: objectType) => {
  return obj.x <= 0
}

export const isTouchTopScreenBorder = (obj: objectType) => {
  return obj.y <= 0
}

export const isTouchRightScreenBorder = (obj: objectType) => {
  return obj.x + obj.width >= viewWidth
}

export const isTouchBottomScreenBorder = (obj: objectType) => {
  return obj.y + obj.height >= viewHeight
}

// 碰撞检测
export const hitTestObject = (r1:objectType, r2:objectType) => {
  // Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy

  // hit will determine whether there's a collision
  hit = false

  // Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2
  r1.centerY = r1.y + r1.height / 2
  r2.centerX = r2.x + r2.width / 2
  r2.centerY = r2.y + r2.height / 2

  // Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2
  r1.halfHeight = r1.height / 2
  r2.halfWidth = r2.width / 2
  r2.halfHeight = r2.height / 2

  // Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX
  vy = r1.centerY - r2.centerY

  // Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth
  combinedHalfHeights = r1.halfHeight + r2.halfHeight

  if (Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights) {
    hit = true
  }

  return hit
}
