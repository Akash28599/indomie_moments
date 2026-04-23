# Data Structure Problems with Examples and Solutions

## Problem 1: Array - Two Sum

**Problem Statement:** Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

**Example:**
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

**Constraints:**
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.

### Solution in JavaScript:
```javascript
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}

// Example usage:
// console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
```

### Solution in Python:
```python
def two_sum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    hashmap = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hashmap:
            return [hashmap[complement], i]
        hashmap[num] = i
    return []

# Example usage:
# print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
```

---

## Problem 2: Linked List - Reverse Linked List

**Problem Statement:** Given the head of a singly linked list, reverse the list, and return the reversed list.

**Example:**
Input: head = [1, 2, 3, 4, 5]
Output: [5, 4, 3, 2, 1]

**Constraints:**
- The number of nodes in the list is the range [0, 5000].
- -5000 <= Node.val <= 5000

### Solution in JavaScript:
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode|null} head
 * @return {ListNode|null}
 */
var reverseList = function(head) {
    let prev = null;
    let current = head;
    
    while (current !== null) {
        const nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }
    return prev;
};

// Example usage:
// const head = {val: 1, next: {val: 2, next: {val: 3, next: null}}};
// console.log(reverseList(head));
```

### Solution in Python:
```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reverseList(self, head):
        """
        :type head: ListNode
        :rtype: ListNode
        """
        prev = None
        current = head
        
        while current:
            next_temp = current.next
            current.next = prev
            prev = current
            current = next_temp
            
        return prev

# Example usage:
# head = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5)))))
# sol = Solution()
# print(sol.reverseList(head))
```

---

## Problem 3: Stack - Valid Parentheses

**Problem Statement:** Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Example:**
Input: s = "()[]{}"
Output: true

**Constraints:**
- 1 <= s.length <= 10^4
- s consists of parentheses only '()[]{}'.

### Solution in JavaScript:
```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = [];
    const map = new Map([
        [')', '('],
        [']', '['],
        ['}', '{']
    ]);
    
    for (let char of s) {
        if (map.has(char)) {
            // If it's a closing bracket
            const topElement = stack.length === 0 ? '#' : stack.pop();
            if (map.get(char) !== topElement) {
                return false;
            }
        } else {
            // If it's an opening bracket, push to stack
            stack.push(char);
        }
    }
    
    return stack.length === 0;
};

// Example usage:
// console.log(isValid("()[]{}")); // true
// console.log(isValid("([)]"));   // false
```

### Solution in Python:
```python
class Solution:
    def isValid(self, s):
        """
        :type s: str
        :rtype: bool
        """
        stack = []
        mapping = {")": "(", "}": "{", "]": "["}
        
        for char in s:
            if char in mapping:
                # If it's a closing bracket
                top_element = stack.pop() if stack else '#'
                if mapping[char] != top_element:
                    return False
            else:
                # If it's an opening bracket, push to stack
                stack.append(char)
        
        return not stack

# Example usage:
# sol = Solution()
# print(sol.isValid("()[]{}"))  # True
# print(sol.isValid("([)]"))    # False
```

---

## Problem 4: Queue - Implement Queue using Stacks

**Problem Statement:** Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

**Example:**
Input
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 1, 1, false]

**Constraints:**
- 1 <= x <= 9
- At most 100 calls will be made to push, pop, peek, and empty.
- All the calls to pop and peek are valid.

### Solution in JavaScript:
```javascript
/**
 * Initialize your data structure here.
 */
var MyQueue = function() {
    this.stack1 = []; // for push
    this.stack2 = []; // for pop/peek
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.stack1.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    this.peek(); // Ensure stack2 has the front element
    return this.stack2.pop();
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    if (this.stack2.length === 0) {
        // Move all elements from stack1 to stack2
        while (this.stack1.length > 0) {
            this.stack2.push(this.stack1.pop());
        }
    }
    return this.stack2[this.stack2.length - 1];
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.stack1.length === 0 && this.stack2.length === 0;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

// Example usage:
// const queue = new MyQueue();
// queue.push(1);
// queue.push(2);
// console.log(queue.peek()); // 1
// console.log(queue.pop());  // 1
// console.log(queue.empty()); // false
```

### Solution in Python:
```python
class MyQueue:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.stack1 = []  # for push
        self.stack2 = []  # for pop/peek

    def push(self, x: int) -> None:
        """
        Push element x to the back of queue.
        """
        self.stack1.append(x)

    def pop(self) -> int:
        """
        Removes the element from in front of queue and returns that element.
        """
        self.peek()  # Ensure stack2 has the front element
        return self.stack2.pop()

    def peek(self) -> int:
        """
        Get the front element.
        """
        if not self.stack2:
            # Move all elements from stack1 to stack2
            while self.stack1:
                self.stack2.append(self.stack1.pop())
        return self.stack2[-1]

    def empty(self) -> bool:
        """
        Returns whether the queue is empty.
        """
        return not self.stack1 and not self.stack2

# Your MyQueue object will be instantiated and called as such:
# obj = MyQueue()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.peek()
# param_4 = obj.empty()

# Example usage:
# queue = MyQueue()
# queue.push(1)
# queue.push(2)
# print(queue.peek())  # 1
# print(queue.pop())   # 1
# print(queue.empty()) # False
```

---

## Problem 5: Binary Tree - Maximum Depth of Binary Tree

**Problem Statement:** Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Example:**
Input: root = [3,9,20,null,null,15,7]
Output: 3

**Constraints:**
- The number of nodes in the tree is in the range [0, 10^4].
- -100 <= Node.val <= 100

### Solution in JavaScript:
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode|null} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (root === null) {
        return 0;
    }
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    return Math.max(leftDepth, rightDepth) + 1;
};

// Example usage:
// const root = {
//   val: 3,
//   left: { val: 9, left: null, right: null },
//   right: {
//     val: 20,
//     left: { val: 15, left: null, right: null },
//     right: { val: 7, left: null, right: null }
//   }
// };
// console.log(maxDepth(root)); // 3
```

### Solution in Python:
```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def maxDepth(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        if not root:
            return 0
        
        left_depth = self.maxDepth(root.left)
        right_depth = self.maxDepth(root.right)
        return max(left_depth, right_depth) + 1

# Example usage:
# root = TreeNode(3, 
#                 TreeNode(9), 
#                 TreeNode(20, 
#                         TreeNode(15), 
#                         TreeNode(7)))
# sol = Solution()
# print(sol.maxDepth(root))  # 3
```

---

## Problem 6: Hash Table - First Unique Character in a String

**Problem Statement:** Given a string `s`, find the first non-repeating character in it and return its index. If it does not exist, return -1.

**Example:**
Input: s = "leetcode"
Output: 0

**Constraints:**
- 1 <= s.length <= 10^5
- s consists of only lowercase English letters.

### Solution in JavaScript:
```javascript
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    const charCount = new Map();
    
    // Count frequency of each character
    for (let char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    // Find the first character with count 1
    for (let i = 0; i < s.length; i++) {
        if (charCount.get(s[i]) === 1) {
            return i;
        }
    }
    
    return -1;
};

// Example usage:
// console.log(firstUniqChar("leetcode")); // 0
// console.log(firstUniqChar("loveleetcode")); // 2
```

### Solution in Python:
```python
class Solution:
    def firstUniqChar(self, s):
        """
        :type s: str
        :rtype: int
        """
        from collections import Counter
        
        # Count frequency of each character
        char_count = Counter(s)
        
        # Find the first character with count 1
        for i, char in enumerate(s):
            if char_count[char] == 1:
                return i
        
        return -1

# Example usage:
# sol = Solution()
# print(sol.firstUniqChar("leetcode"))  # 0
# print(sol.firstUniqChar("loveleetcode"))  # 2
```

---

## Problem 7: Heap - Kth Largest Element in an Array

**Problem Statement:** Given an integer array `nums` and an integer `k`, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

**Example:**
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5

**Constraints:**
- 1 <= k <= nums.length <= 10^4
- -10^4 <= nums[i] <= 10^4

### Solution in JavaScript:
```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    // Using min-heap approach (priority queue)
    const MinHeap = function() {
        this.heap = [];
    };
    
    MinHeap.prototype.parent = function(i) {
        return Math.floor((i - 1) / 2);
    };
    
    MinHeap.prototype.leftChild = function(i) {
        return 2 * i + 1;
    };
    
    MinHeap.prototype.rightChild = function(i) {
        return 2 * i + 2;
    };
    
    MinHeap.prototype.swap = function(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    };
    
    MinHeap.prototype.peek = function() {
        return this.heap[0];
    };
    
    MinHeap.prototype.size = function() {
        return this.heap.length;
    };
    
    MinHeap.prototype.push = function(value) {
        this.heap.push(value);
        let index = this.heap.length - 1;
        
        while (index > 0) {
            let parentIndex = this.parent(index);
            if (this.heap[parentIndex] <= this.heap[index]) break;
            this.swap(parentIndex, index);
            index = parentIndex;
        }
    };
    
    MinHeap.prototype.pop = function() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        let index = 0;
        
        while (this.leftChild(index) < this.heap.length) {
            let smallerIndex = this.leftChild(index);
            const rightIndex = this.rightChild(index);
            
            if (rightIndex < this.heap.length && 
                this.heap[rightIndex] < this.heap[smallerIndex]) {
                smallerIndex = rightIndex;
            }
            
            if (this.heap[index] <= this.heap[smallerIndex]) break;
            this.swap(index, smallerIndex);
            index = smallerIndex;
        }
        
        return top;
    };
    
    const minHeap = new MinHeap();
    
    // Build min-heap of size k
    for (let i = 0; i < nums.length; i++) {
        minHeap.push(nums[i]);
        if (minHeap.size() > k) {
            minHeap.pop(); // Remove smallest element
        }
    }
    
    return minHeap.peek();
};

// Example usage:
// console.log(findKthLargest([3,2,1,5,6,4], 2)); // 5
```

### Solution in Python:
```python
import heapq
from typing import List

class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        """
        :type nums: List[int]
        :type k: int
        :rtype: int
        """
        # Using min-heap of size k
        min_heap = []
        
        for num in nums:
            heapq.heappush(min_heap, num)
            if len(min_heap) > k:
                heapq.heappop(min_heap)  # Remove smallest element
        
        return min_heap[0]  # Root of min-heap is kth largest

# Example usage:
# sol = Solution()
# print(sol.findKthLargest([3,2,1,5,6,4], 2))  # 5
```

---

## Problem 8: Graph - Number of Islands

**Problem Statement:** Given an m x n 2D binary grid `grid` which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

**Example:**
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

**Constraints:**
- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 300
- grid[i][j] is '0' or '1'.

### Solution in JavaScript:
```javascript
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    if (grid === null || grid.length === 0) {
        return 0;
    }
    
    const rows = grid.length;
    const cols = grid[0].length;
    let numIslands = 0;
    
    const dfs = (r, c) => {
        // Check bounds and if it's water
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
            return;
        }
        
        // Mark as visited
        grid[r][c] = '0';
        
        // Explore neighbors (up, down, left, right)
        dfs(r - 1, c); // up
        dfs(r + 1, c); // down
        dfs(r, c - 1); // left
        dfs(r, c + 1); // right
    };
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                numIslands++;
                dfs(r, c);
            }
        }
    }
    
    return numIslands;
};

// Example usage:
// const grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ];
// console.log(numIslands(grid)); // 1
```

### Solution in Python:
```python
from typing import List

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        """
        :type grid: List[List[str]]
        :rtype: int
        """
        if not grid or not grid[0]:
            return 0
        
        rows = len(grid)
        cols = len(grid[0])
        num_islands = 0
        
        def dfs(r, c):
            # Check bounds and if it's water
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
                return
            
            # Mark as visited
            grid[r][c] = '0'
            
            # Explore neighbors (up, down, left, right)
            dfs(r - 1, c)  # up
            dfs(r + 1, c)  # down
            dfs(r, c - 1)  # left
            dfs(r, c + 1)  # right
        
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    num_islands += 1
                    dfs(r, c)
        
        return num_islands

# Example usage:
# sol = Solution()
# grid = [
#   ["1","1","1","1","0"],
#   ["1","1","0","1","0"],
#   ["1","1","0","0","0"],
#   ["0","0","0","0","0"]
# ]
# print(sol.numIslands(grid))  # 1
```

---
*These problems cover fundamental data structures and are commonly asked in technical interviews.*