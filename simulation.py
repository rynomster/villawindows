import threading
import random
import time
from lru_cache import LRUCache

def worker(cache, thread_id, num_ops, max_key):
    for i in range(num_ops):
        op = random.choice(['get', 'put'])
        key = random.randint(0, max_key)
        if op == 'get':
            val = cache.get(key)
            # print(f"Thread-{thread_id}: GET {key} -> {val}")
        else:
            val = f"val-{thread_id}-{i}"
            cache.put(key, val)
            # print(f"Thread-{thread_id}: PUT {key}={val}")

        if i % 100 == 0:
            time.sleep(0.001)  # Yield sometimes

def run_simulation():
    capacity = 10
    max_key = 20
    num_threads = 5
    ops_per_thread = 2000

    cache = LRUCache(capacity)
    threads = []

    print(f"Starting simulation with {num_threads} threads...")
    start_time = time.time()

    for i in range(num_threads):
        t = threading.Thread(target=worker, args=(cache, i, ops_per_thread, max_key))
        threads.append(t)
        t.start()

    for t in threads:
        t.join()

    end_time = time.time()
    print(f"Simulation completed in {end_time - start_time:.4f} seconds.")
    print(f"Final cache size: {len(cache)}")

    # Basic sanity check: Cache size should not exceed capacity
    assert len(cache) <= capacity, f"Cache size {len(cache)} exceeds capacity {capacity}!"

    # Verify LRU property and data consistency
    # (Since it's highly concurrent, specific ordering is hard to predict,
    # but we can ensure no crash occurred and size is correct)
    print("Sanity checks passed.")

if __name__ == "__main__":
    run_simulation()
